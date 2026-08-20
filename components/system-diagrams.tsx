/*
  Hand-authored system diagrams. The amber boundary line is the shared axis:
  what sits above it is inside the system's own network; anything that
  crosses it is drawn crossing it, in signal amber. Text inherits the site's
  font variables so the diagrams follow the theme.
*/

const mono = "var(--font-plex-mono), ui-monospace, monospace";
const sans = "var(--font-plex-sans), ui-sans-serif, sans-serif";

function Box({
  x,
  y,
  w,
  h = 50,
  title,
  sub,
  dashed = false,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string;
  sub?: string;
  dashed?: boolean;
}) {
  const cx = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2}
        fill="none"
        stroke={dashed ? "var(--slate)" : "var(--ink)"}
        strokeDasharray={dashed ? "2 3" : undefined}
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fontFamily={sans}
        fontSize={13}
        fill="var(--ink)"
      >
        {title}
      </text>
      {sub && (
        <text
          x={cx}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fontFamily={mono}
          fontSize={10}
          fill="var(--slate)"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Boundary({ y, width }: { y: number; width: number }) {
  return (
    <g>
      <line x1={0} y1={y} x2={width} y2={y} stroke="var(--signal)" strokeWidth={1.5} />
      <text
        x={0}
        y={y + 16}
        fontFamily={mono}
        fontSize={10}
        letterSpacing={1.5}
        fill="var(--signal)"
      >
        BOUNDARY
      </text>
    </g>
  );
}

function ZoneLabel({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} fontFamily={mono} fontSize={10} letterSpacing={1.5} fill="var(--slate)">
      {children}
    </text>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  signal = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  signal?: boolean;
}) {
  const color = signal ? "var(--signal)" : "var(--slate)";
  // Arrowhead: small triangle pointing along the line's direction.
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 5;
  const p1 = `${x2},${y2}`;
  const p2 = `${x2 - size * Math.cos(angle - 0.5)},${y2 - size * Math.sin(angle - 0.5)}`;
  const p3 = `${x2 - size * Math.cos(angle + 0.5)},${y2 - size * Math.sin(angle + 0.5)}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} />
      <polygon points={`${p1} ${p2} ${p3}`} fill={color} />
    </g>
  );
}

function DiagramFrame({
  height,
  label,
  desc,
  children,
}: {
  height: number;
  label: string;
  desc: string;
  children: React.ReactNode;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <figure className="my-10 border border-line-strong bg-panel p-5 sm:p-7 overflow-x-auto">
      <div className="min-w-[560px]">
        <svg
          viewBox={`0 0 640 ${height}`}
          width="100%"
          role="img"
          aria-labelledby={`${id}-t ${id}-d`}
        >
          <title id={`${id}-t`}>{label}</title>
          <desc id={`${id}-d`}>{desc}</desc>
          {children}
        </svg>
      </div>
    </figure>
  );
}

function SafecastDiagram() {
  return (
    <DiagramFrame
      height={262}
      label="Safecast assistant system diagram"
      desc="Three Safecast data services feed an MCP server inside Safecast's infrastructure. Below the boundary line, the assistant — embedded in the map and standalone — reaches across via streaming calls with scoped keys."
    >
      <ZoneLabel x={0} y={12}>
        SAFECAST INFRASTRUCTURE
      </ZoneLabel>
      <Box x={0} y={24} w={150} h={42} title="Measurements" />
      <Box x={180} y={24} w={150} h={42} title="Devices" />
      <Box x={360} y={24} w={150} h={42} title="Geo lookups" />
      <Arrow x1={75} y1={66} x2={200} y2={96} />
      <Arrow x1={255} y1={66} x2={255} y2={96} />
      <Arrow x1={435} y1={66} x2={310} y2={96} />
      <Box x={165} y={98} w={180} h={46} title="MCP server" sub="governed tools" />
      <Boundary y={176} width={640} />
      <Arrow x1={255} y1={144} x2={255} y2={196} signal />
      <text x={268} y={172} fontFamily={mono} fontSize={10} fill="var(--signal)">
        streaming · scoped keys
      </text>
      <Box x={145} y={198} w={220} h={46} title="Assistant" sub="embedded in map · standalone" />
      <ZoneLabel x={0} y={256}>
        PUBLIC WEB
      </ZoneLabel>
    </DiagramFrame>
  );
}

function OnPremRagDiagram() {
  return (
    <DiagramFrame
      height={248}
      label="On-prem RAG system diagram"
      desc="Documents, a hybrid RAG pipeline, and a quantized model all sit inside the client network, alongside CRM, Postgres, S3 and internal APIs exposed as governed MCP tools. Below the boundary line, the internet: nothing crosses at inference."
    >
      <ZoneLabel x={0} y={12}>
        CLIENT NETWORK
      </ZoneLabel>
      <Box x={0} y={24} w={150} title="Documents" sub="400K+" />
      <Arrow x1={150} y1={49} x2={188} y2={49} />
      <Box x={190} y={24} w={170} title="Hybrid RAG" sub="retrieve · rerank · cite" />
      <Arrow x1={360} y1={49} x2={398} y2={49} />
      <Box x={400} y={24} w={190} title="Quantized model" sub="client hardware" />
      <Arrow x1={275} y1={100} x2={275} y2={74} />
      <Box
        x={65}
        y={102}
        w={460}
        h={44}
        dashed
        title="CRM · Postgres · S3 · internal APIs"
        sub="three governed MCP servers"
      />
      <Boundary y={182} width={640} />
      <ZoneLabel x={0} y={224}>
        INTERNET — NOTHING CROSSES AT INFERENCE
      </ZoneLabel>
    </DiagramFrame>
  );
}

function OriginDiagram() {
  return (
    <DiagramFrame
      height={252}
      label="Origin system diagram"
      desc="A LangGraph orchestrator, AutoGen agents, and self-hosted Shisa-70B inference sit above the boundary line on infrastructure we ran. Public 10-K filings and market data cross the line inward to the agents."
    >
      <ZoneLabel x={0} y={12}>
        SELF-HOSTED FOR THE WEEKEND
      </ZoneLabel>
      <Box x={0} y={24} w={190} title="LangGraph" sub="orchestrator" />
      <Arrow x1={190} y1={49} x2={228} y2={49} />
      <Box x={230} y={24} w={170} title="AutoGen agents" sub="filings · market · thesis" />
      <Arrow x1={400} y1={49} x2={438} y2={49} />
      <Box x={440} y={24} w={200} title="Shisa-70B" sub="self-hosted inference" />
      <Boundary y={132} width={640} />
      <Arrow x1={210} y1={168} x2={280} y2={76} signal />
      <Arrow x1={430} y1={168} x2={340} y2={76} signal />
      <text x={252} y={122} fontFamily={mono} fontSize={10} fill="var(--signal)">
        pulled in
      </text>
      <Box x={90} y={170} w={190} h={44} title="10-K filings" sub="EDGAR" />
      <Box x={360} y={170} w={190} h={44} title="Market data" />
      <ZoneLabel x={0} y={246}>
        PUBLIC SOURCES
      </ZoneLabel>
    </DiagramFrame>
  );
}

export const systemDiagrams: Record<string, React.ComponentType> = {
  "safecast-assistant": SafecastDiagram,
  "on-prem-rag": OnPremRagDiagram,
  origin: OriginDiagram,
};
