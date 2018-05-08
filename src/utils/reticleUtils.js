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