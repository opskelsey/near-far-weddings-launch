import { intakeSchema, type IntakeInput } from './intake-schema';

// Web3Forms publishable submission key is designed for browser-side forms.
export const WEB3FORMS_PUBLIC_ACCESS_KEY = '660107bd-8fef-47fe-8c67-287833a3ffc0';

export async function deliverIntake(input: IntakeInput, accessKey: string, send: typeof fetch = fetch): Promise<{ success: boolean }> {
  const data = intakeSchema.parse(input);
  if (data.botcheck) return { success: false };
  try {
    const body = new FormData();
    body.set('access_key', accessKey);
    body.set('name', data.name);
    body.set('email', data.email);
    body.set('date', data.date || 'Still deciding');
    body.set('services', data.services);
    body.set('subject', 'Near & Far Weddings — new inquiry');
    const response = await send('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
      signal: AbortSignal.timeout(15000),
    });
    const result: unknown = await response.json();
    return { success: response.ok && typeof result === 'object' && result !== null && 'success' in result && result.success === true };
  } catch {
    return { success: false };
  }
}