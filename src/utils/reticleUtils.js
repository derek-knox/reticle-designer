export function getRadiusFromMouseAndClientRect(payload) {
    const rect = payload.ref.getBoundingClientRect();
    const a = payload.event.offsetX - (rect.width / 2);
    const b = payload.event.offsetY - (rect.height / 2);
    return Math.sqrt(a * a + b * b);
}

export function getEditAreaInfo(payload) {
    const rect = payload.ref.getBoundingClientRect();
    return {
        rect: rect,
        point: {
            x: (rect.width / 2),
            y: (rect.height / 2)
        }
    }
}

export function getArcDataFromDivisionCount(payload) {
    const arcDist = 360 / payload.divisions;
    const arcCount = 360 / arcDist;
    var arcs = [];

    // Iterate through count to provide start and end degrees
    for (let i = 0; i < arcCount; i++) { arcs.push(i * arcDist); }
    arcs.push(360);

    // Map the arcs into more usable data
    arcs = arcs.map((curr, idx, arr) => {
        if (idx === arr.length - 1) return null;
        return { id: idx, start: curr, end: arr[idx + 1] }
    });

    // Clean the last item as we want one less to close the gap at 360
    arcs.pop();

    return arcs;
}

export function describeSvgArc(payload) {

    var start = polarToCartesian(payload.x, payload.y, payload.radius, payload.endAngle);
    var end = polarToCartesian(payload.x, payload.y, payload.radius, payload.startAngle);

    var largeArcFlag = payload.endAngle - payload.startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", payload.radius, payload.radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}