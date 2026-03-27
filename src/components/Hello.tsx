import { Link } from '@/libs/I18nNavigation';
import { ROUTES_FE } from '@/routers';
import { Sponsors } from './Sponsors';

export const Hello = () => (
  <>
    <p>{`👋 `}</p>
    <Link href={ROUTES_FE.NEW_ROUTE_123} />
    <Sponsors />
  </>
);
