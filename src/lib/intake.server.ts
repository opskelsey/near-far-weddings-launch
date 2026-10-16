import { intakeSchema, type IntakeInput } from './intake-schema';

export async function deliverIntake(input: IntakeInput, accessKey: string, send: typeof fetch = fetch): Promise<{ success: boolean }> {
  const data = intakeSchema.parse(input);
  if (data.botcheck) return { success: false };
  try {
    const response = await send('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        name: data.name,
        email: data.email,
        date: data.date || 'Still deciding',
        services: data.services,
        subject: 'Near & Far Weddings — new inquiry',
        botcheck: false,
      }),
      signal: AbortSignal.timeout(15000),
    });
    const result: unknown = await response.json();
    return { success: response.ok && typeof result === 'object' && result !== null && 'success' in result && result.success === true };
  } catch {
    return { success: false };
  }
}