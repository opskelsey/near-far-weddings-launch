import { describe, expect, it, vi } from 'vitest';
import { intakeSchema } from '@/lib/intake-schema';
import { deliverIntake } from '@/lib/intake';

const input = { name: 'Test Couple', email: 'test@example.com', date: '2027-05-22', services: 'Day-of Coordination', botcheck: false };

describe('Intake submissions', () => {
  it('rejects missing names, invalid emails, dates, and unavailable services', () => {
    for (const invalid of [{ name: ' ' }, { email: 'invalid' }, { date: '2027-02-30' }, { services: 'Unknown' }]) {
      expect(intakeSchema.safeParse({ ...input, ...invalid }).success).toBe(false);
    }
  });
  it('posts name, email, date, and services to Web3Forms', async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ success: true }));
    expect(await deliverIntake(input, 'test-only', send)).toEqual({ success: true });
    const call = send.mock.calls[0];
    expect(call?.[0]).toBe('https://api.web3forms.com/submit');
    expect(call?.[1]?.method).toBe('POST');
    const body = call?.[1]?.body;
    expect(body).toBeInstanceOf(FormData);
    if (!(body instanceof FormData)) throw new Error('Expected form fields');
    expect({ name: body.get('name'), email: body.get('email'), date: body.get('date'), services: body.get('services') }).toEqual({ name: input.name, email: input.email, date: input.date, services: input.services });
  });
  it('allows an undecided date', () => expect(intakeSchema.safeParse({ ...input, date: '' }).success).toBe(true));
  it('only confirms success when Web3Forms accepts the request', async () => {
    for (const response of [Response.json({ success: false }), Response.json({ success: true }, { status: 400 }), Response.json({})]) {
      expect(await deliverIntake(input, 'test-only', vi.fn<typeof fetch>().mockResolvedValue(response))).toEqual({ success: false });
    }
  });
  it('handles network failures without confirming delivery', async () => {
    expect(await deliverIntake(input, 'test-only', vi.fn<typeof fetch>().mockRejectedValue(new Error('Offline')))).toEqual({ success: false });
  });
  it('does not send honeypot submissions', async () => {
    const send = vi.fn<typeof fetch>();
    expect(await deliverIntake({ ...input, botcheck: true }, 'test-only', send)).toEqual({ success: false });
    expect(send).not.toHaveBeenCalled();
  });
});