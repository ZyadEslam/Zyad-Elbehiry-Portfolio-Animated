export interface Point {
    x: number;
    y: number;
  }
  
  /** "#61DAFB" -> "rgba(97,218,251,0.25)" — used for the ambient glow so we
   * don't depend on the still-patchy `color-mix()` CSS function. */
  export function hexToRgba(hex: string, alpha: number): string {
    const clean = hex.replace("#", "");
    const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  
  /**
   * Converts an ordered list of points into a single smooth SVG path `d`
   * string using a uniform Catmull-Rom -> cubic Bezier conversion. This is
   * what gives the connector its organic, hand-drawn curve instead of
   * straight polyline segments between nodes.
   */
  export function catmullRomToBezier(points: Point[]): string {
    if (points.length === 0) return "";
    if (points.length === 1) return `M${points[0].x},${points[0].y}`;
  
    let d = `M${points[0].x},${points[0].y} `;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] ?? points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] ?? p2;
  
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
  
      d += `C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)} `;
    }
    return d.trim();
  }
  
  /**
   * Inserts `stepsPerSegment` linearly-interpolated points between every
   * consecutive pair of real skill nodes. Feeding these finer points through
   * `catmullRomToBezier` at each index gives many small, smooth shape
   * changes instead of one big jump per skill — which is what makes the
   * MorphSVG-driven connector feel like it's continuously growing rather
   * than snapping node to node.
   */
  export function buildFinePoints(nodes: Point[], stepsPerSegment: number): Point[] {
    if (nodes.length < 2) return nodes;
    const pts: Point[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i];
      const b = nodes[i + 1];
      for (let s = 0; s < stepsPerSegment; s++) {
        const t = s / stepsPerSegment;
        pts.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
      }
    }
    pts.push(nodes[nodes.length - 1]);
    return pts;
  }
  
  /**
   * Precomputes the path `d` string for every cumulative prefix of `points`
   * (1 point .. all points) so the scroll handler can just index into an
   * array instead of recomputing a spline on every tick.
   */
  export function buildCumulativePaths(points: Point[]): string[] {
    const out: string[] = [];
    for (let i = 1; i <= points.length; i++) {
      out.push(catmullRomToBezier(points.slice(0, i)));
    }
    return out;
  }