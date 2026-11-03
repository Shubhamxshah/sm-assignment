type IconProps = { className?: string };

export function SearchIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function JarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="16" y="6" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M14 16h20l-1.5 22a4 4 0 0 1-4 3.6h-9a4 4 0 0 1-4-3.6L14 16Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M15 24h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 10.5 12 4.5l7.5 6V19a1.5 1.5 0 0 1-1.5 1.5h-4.2v-5.2H10.2V20.5H6A1.5 1.5 0 0 1 4.5 19v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WorkshopIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function ShopIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 8.5h14l-1 11.2a1.5 1.5 0 0 1-1.5 1.3H7.5A1.5 1.5 0 0 1 6 19.7L5 8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 8.4V7a3 3 0 0 1 6 0v1.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function ProfileIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8.2" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5.2 19.2c1.2-2.8 3.6-4.2 6.8-4.2s5.6 1.4 6.8 4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19s1-8 7.2-11.2C16.8 5.6 20 5 20 5s-.2 3.4-2.6 7.2C14.6 16.6 8 18 5 19Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 14c1.4-1.2 3-2.6 5.2-4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function BowlIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 11h15a6.5 6.5 0 0 1-13 0h0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 7.5c.6-1.6 2.4-1.6 3 0 .6-1.6 2.4-1.6 3 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function PeopleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.8 17.5c.7-2.2 2.4-3.3 4.2-3.3 1.9 0 3.6 1.1 4.3 3.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M13.2 14.4c1.3-.3 2.6.2 3.4 1.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 7l10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
