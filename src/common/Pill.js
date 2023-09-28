function StatusPill({ status }) {
	return <div class="status-pill washed">{status}</div>;
}

export function DatePill({ date }) {
	return <div class="status-pill returned">{date}</div>;
}

export function GreenPill({ text }) {
	return <div class="status-pill returned">{text}</div>;
}

export function PurplePill({ text }) {
  return <div class="status-pill washed">{text}</div>;
}

export function PinkPill({ text }) {
  return <div class="status-pill dried">{text}</div>;
}

export function BluePill({ text }) {
  return <div class="status-pill received">{text}</div>;
}

export function RedPill({ text }) {
  return <div className="status-pill red">{text}</div>
}

export function BluePillHollow({ text }) {
  return <div className="status-pill blue-hollow">{text}</div>
}

export default StatusPill;
