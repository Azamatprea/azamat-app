"use client";

import { useRef, useState } from "react";

/*
  The boundary line, made interactive. Three boxes of an on-prem
  deployment sit at fixed positions; the visitor drags the horizontal
  boundary up or down. A box above the line is inside the network —
  solid, labeled INSIDE; a box below it is outside — dashed, muted,
  labeled OUTSIDE. The interaction carries the idea; the caption stays
  short. Draggable by pointer, adjustable by arrow keys when focused.
*/

const VB_W = 640;
const VB_H = 360;
const LINE_MIN = 28;
const LINE_MAX = 332;

const BOXES = [
  { x: 12, y: 36, w: 170, h: 54, title: "Chat UI" },
  { x: 235, y: 128, w: 170, h: 54, title: "RAG pipeline" },
  { x: 458, y: 220, w: 170, h: 54, title: "Quantized model" },
];

const mono = "var(--font-plex-mono), ui-monospace, monospace";
const sans = "var(--font-plex-sans), ui-sans-serif, sans-serif";

export function BoundaryDemo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [lineY, setLineY] = useState(300);
  const [dragging, setDragging] = useState(false);

  function clamp(y: number) {
    return Math.min(LINE_MAX, Math.max(LINE_MIN, y));
  }

  function yFromPointer(clientY: number) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return lineY;
    return clamp(((clientY - rect.top) / rect.height) * VB_H);
  }

  function onPointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture(e.pointerId);
    setDragging(true);
    setLineY(yFromPointer(e.clientY));
  }

  function onPointerMove(e: React.PointerEvent) {
    if (dragging) setLineY(yFromPointer(e.clientY));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setLineY((y) => clamp(y - 14));
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setLineY((y) => clamp(y + 14));
    }
  }

  const insideCount = BOXES.filter((b) => b.y + b.h / 2 < lineY).length;

  return (
    <figure className="my-2">
      <div className="overflow-x-auto border border-line-strong bg-panel p-4 sm:p-6">
        <div className="min-w-[480px]">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            width="100%"
            role="img"
            aria-label={`Interactive diagram: a draggable network boundary. ${insideCount} of ${BOXES.length} components currently inside the network.`}
            onPointerMove={onPointerMove}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
            style={{ touchAction: "none", userSelect: "none" }}
          >
            {/* connections, drawn first so boxes sit on top */}
            <line x1={182} y1={63} x2={235} y2={155} stroke="var(--line-strong)" />
            <line x1={405} y1={155} x2={458} y2={247} stroke="var(--line-strong)" />

            {BOXES.map((b) => {
              const inside = b.y + b.h / 2 < lineY;
              return (
                <g key={b.title} opacity={inside ? 1 : 0.75}>
                  <rect
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height={b.h}
                    rx={2}
                    fill="none"
                    stroke={inside ? "var(--ink)" : "var(--slate)"}
                    strokeDasharray={inside ? undefined : "3 4"}
                  />
                  <text
                    x={b.x + b.w / 2}
                    y={b.y + 24}
                    textAnchor="middle"
                    fontFamily={sans}
                    fontSize={13}
                    fill={inside ? "var(--ink)" : "var(--slate)"}
                  >
                    {b.title}
                  </text>
                  <text
                    x={b.x + b.w / 2}
                    y={b.y + 42}
                    textAnchor="middle"
                    fontFamily={mono}
                    fontSize={9}
                    letterSpacing={1.2}
                    fill={inside ? "var(--signal)" : "var(--slate)"}
                  >
                    {inside ? "INSIDE THE NETWORK" : "OUTSIDE"}
                  </text>
                </g>
              );
            })}

            {/* the boundary: generous invisible hit area, visible hairline */}
            <g
              role="slider"
              aria-label="Network boundary position"
              aria-valuemin={LINE_MIN}
              aria-valuemax={LINE_MAX}
              aria-valuenow={Math.round(lineY)}
              aria-valuetext={`${insideCount} of ${BOXES.length} components inside`}
              tabIndex={0}
              onPointerDown={onPointerDown}
              onKeyDown={onKeyDown}
              style={{ cursor: "ns-resize", outline: "none" }}
            >
              <rect
                x={0}
                y={lineY - 14}
                width={VB_W}
                height={28}
                fill="transparent"
              />
              <line
                x1={0}
                y1={lineY}
                x2={VB_W}
                y2={lineY}
                stroke="var(--signal)"
                strokeWidth={dragging ? 2.5 : 1.5}
              />
              <text
                x={0}
                y={lineY + 16}
                fontFamily={mono}
                fontSize={10}
                letterSpacing={1.5}
                fill="var(--signal)"
              >
                BOUNDARY — DRAG
              </text>
              {/* drag handle affordance */}
              <g stroke="var(--signal)" strokeWidth={1.5}>
                <line x1={VB_W - 34} y1={lineY - 5} x2={VB_W - 14} y2={lineY - 5} />
                <line x1={VB_W - 34} y1={lineY + 5} x2={VB_W - 14} y2={lineY + 5} />
              </g>
            </g>
          </svg>
        </div>
      </div>
      <figcaption className="label mt-3 tracking-[0.08em]">
        Drag the line. What sits above it is yours.
      </figcaption>
    </figure>
  );
}
