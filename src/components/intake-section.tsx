import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CalendarIcon, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { offerings } from '@/lib/wedding-offerings';
import { intakeSchema } from '@/lib/intake-schema';
import { deliverIntake, WEB3FORMS_PUBLIC_ACCESS_KEY } from '@/lib/intake';

type IntakeSectionProps = {
  service: string;
  onServiceChange: (service: string) => void;
};

export function IntakeSection({ service, onServiceChange }: IntakeSectionProps) {
  const [date, setDate] = useState<Date>();
  const [dateOpen, setDateOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);
  const [confirmation, setConfirmation] = useState('');
  const [submitError, setSubmitError] = useState('');

  async function submitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    setConfirmation('');
    setSubmitError('');
    const parsed = intakeSchema.safeParse({
      name: fields.get('name'), email: fields.get('email'),
      date: date ? format(date, 'yyyy-MM-dd') : '', services: service,
      botcheck: fields.get('botcheck') === 'on',
    });
    if (!parsed.success) {
      setSubmitError(parsed.error.issues[0]?.message ?? 'Please check your details.');
      return;
    }
    sendingRef.current = true;
    setSending(true);
    try {
      const result = await deliverIntake(parsed.data, WEB3FORMS_PUBLIC_ACCESS_KEY);
      if (!result.success) throw new Error('Submission failed');
      const message = 'Thank you! Your inquiry has been sent. I’ll reply within 1–2 business days.';
      setConfirmation(message);
      toast.success(message);
      form.reset();
      setDate(undefined);
      onServiceChange('Not sure yet');
    } catch {
      setSubmitError('Your inquiry couldn’t be sent. Please try again—your details are still here.');
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }

  return (
    <section id="inquire" className="intake section-space" aria-labelledby="intake-heading"><div className="intake-inner"><div className="intake-intro"><span aria-hidden="true" className="celestial-star">✦</span><h2 id="intake-heading">Let’s begin,<br /><em>shall we?</em></h2><p>Tell me about your day and I’ll reply within 1–2 business days.</p></div>
      <form onSubmit={submitNote} className="intake-form" aria-busy={sending}>
        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />
        <div className="form-row form-names"><label>Your names <span>*</span><input name="name" autoComplete="name" maxLength={100} disabled={sending} required /></label><label htmlFor="wedding-date">Wedding date
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <Button type="button" id="wedding-date" variant="outline" disabled={sending} className={cn('date-trigger', !date && 'date-empty')}>
                <CalendarIcon />
                {date ? format(date, 'PPP') : <span>Still deciding</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 date-pop" align="start">
              <Calendar mode="single" selected={date} captionLayout="dropdown" className="pointer-events-auto" onSelect={day => { setDate(day); setDateOpen(false); }} />
            </PopoverContent>
          </Popover>
        </label></div>
        <div className="form-row form-single"><label>Email <span>*</span><input type="email" name="email" autoComplete="email" maxLength={255} disabled={sending} required /></label></div>
        <div className="form-row form-service"><label htmlFor="service">Which service interests you? <span className="optional">(optional)</span><select id="service" name="services" value={service} disabled={sending} onChange={event => onServiceChange(event.target.value)}><option>Not sure yet</option>{offerings.map(item => <option key={item.id}>{item.service}</option>)}</select></label><Button type="submit" className="primary-cta" disabled={sending}>{sending ? <>Sending… <LoaderCircle className="motion-safe:animate-spin" /></> : <>Send it my way <ArrowRight /></>}</Button></div>
        {confirmation && <p role="status" className="text-sm text-foreground">{confirmation}</p>}
        {submitError && <p role="alert" className="text-sm text-destructive">{submitError}</p>}
      </form>
    </div></section>
  );
}
