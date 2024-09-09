import { FC } from "react";
import { Zone } from "../api/request";

interface SelectZoneProps {
  selectedZone: string;
  zones: Zone[];
  onZoneChange: (zone: string) => void;
}

const SelectZone: FC<SelectZoneProps> = ({
  selectedZone,
  zones,
  onZoneChange,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <select
        value={selectedZone}
        onChange={(e) => onZoneChange(e.target.value)}
        className="rounded-md p-2 w-full bg-blue-50"
      >
        {zones.map((zone: Zone) => (
          <option value={zone.zone}>
            {zone.state} - {zone.area.join(", ")}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectZone;
