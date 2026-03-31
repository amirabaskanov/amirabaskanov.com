import type { MonkeyTypeData } from '@/types/monkeytype'
import { Timer } from '@/components/icons/Timer'
import { Target } from '@/components/icons/Target'
import { Translate } from '@/components/icons/Translate'
import { Monkeytype } from '@/components/icons/Monkeytype'
import BentoBadge from './BentoBadge'

const mapTypingDetailData = (data: MonkeyTypeData) => {
  return [
    { icon: Timer, category: 'Time', value: `${data.time}s` },
    { icon: Target, category: 'Accuracy', value: `${data.acc}%` },
    { icon: Translate, category: 'Language', value: 'EN' }
  ]
}

interface TypingDetailProps {
  category: string
  value: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const TypingDetail = ({ category, icon: Icon, value }: TypingDetailProps) => {
  return (
    <div className="group/tooltip relative">
      <div className="flex items-center gap-1 tracking-wider text-[var(--t-text-heading)]">
        <Icon className="size-4 text-[var(--t-text-muted)] group-hover:text-[var(--t-text-body)]" />
        <p>{value}</p>
      </div>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--t-bg-elevated)] border border-[var(--t-border)] rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity text-xs text-[var(--t-text-primary)] whitespace-nowrap z-10">
        {category}
      </div>
    </div>
  )
}

interface Props {
  data: MonkeyTypeData
}

export default function BentoItemTypingSpeedContent({ data }: Props) {
  return (
    <div className="relative h-full">
      {/* Background Number */}
      <div className="absolute inset-0 flex items-start justify-center -mt-11">
        <p className="font-display text-[clamp(120px,15vw,180px)] font-bold text-transparent bg-gradient-to-b from-[var(--t-border)]/60 via-[var(--t-text-faint)]/40 to-transparent bg-clip-text leading-none">
          {data.wpm}
        </p>
      </div>

      {/* Content */}
      <a
        href={`https://monkeytype.com/profile/amir11`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-full flex-col justify-between rounded-3xl px-0 pb-0 pt-4 max-md:gap-12 transition-colors"
      >
        <div className="relative">
          <div className="flex items-baseline">
            <p className="font-display text-[84px] font-medium leading-tight tracking-normal">
              {data.wpm}
            </p>
            <p className="ml-2 text-2xl leading-none">wpm</p>
          </div>
          <div className="flex gap-4 relative pb-4">
            {mapTypingDetailData(data).map((item) => (
              <TypingDetail key={item.category} {...item} />
            ))}
          </div>
        </div>
      </a>
    </div>
  )
}
