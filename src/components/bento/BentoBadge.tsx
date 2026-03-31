interface BentoBadgeProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  text: string
}

export default function BentoBadge({ icon: Icon, text }: BentoBadgeProps) {
  return (
    <div className="flex items-center gap-2 bg-[var(--t-bg-elevated)] border border-[var(--t-border)] rounded-full py-1.5 px-3">
      <Icon className="size-5 text-[var(--t-icon-color)]" />
      <span className="text-sm font-medium text-[var(--t-text-primary)]">{text}</span>
    </div>
  )
}
