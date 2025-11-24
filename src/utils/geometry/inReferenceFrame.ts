import type { ScaledCoordinates } from "../../types/utils/ScaledCoordinates";

export function inReferenceFrame($event: MouseEvent, reference: ScaledCoordinates) {
	return {
		x: $event.clientX / reference.scale - reference.x,
		y: $event.clientY / reference.scale - reference.y,
	};
}