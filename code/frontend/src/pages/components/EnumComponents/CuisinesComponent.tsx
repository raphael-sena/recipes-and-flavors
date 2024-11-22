import { useState } from "react";
import Flag from "react-world-flags";

const cuisines = [
  { name: "Italian", code: "IT" },
  { name: "Brazilian", code: "BR" },
  { name: "Chinese", code: "CN" },
  { name: "Indian", code: "IN" },
  { name: "Japanese", code: "JP" },
  { name: "German", code: "DE" },
  { name: "Thai", code: "TH" },
  { name: "Mexican", code: "MX" },
  { name: "French", code: "FR" },
  { name: "USA", code: "USA" },
];

type CuisinesComponentProps = {
  selectedCuisine: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function CuisinesComponent({
  selectedCuisine,
  onChange,
}: CuisinesComponentProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="inline-block font-mulish">
      <button
        className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 text-left text-darkBlue flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-darkBlue"
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <span className="w-full flex">
          {selectedCuisine ? (
            <>
              <Flag
                code={
                  cuisines.find((c) => c.name === selectedCuisine)?.code || ""
                }
                style={{ height: "20px", width: "20px" }}
                className="mr-2"
              />
              {selectedCuisine}
            </>
          ) : (
            "Select cuisine type"
          )}
        </span>
        <span className="ml-2">▼</span>
      </button>
      {dropdownOpen && (
        <div className="relative absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {cuisines.map((cuisine) => (
            <div
              key={cuisine.name}
              className="cursor-pointer py-2 px-4 flex items-center hover:bg-gray-100 hover:rounded-lg"
              onClick={() => {
                onChange({ target: { value: cuisine.name } } as React.ChangeEvent<HTMLSelectElement>);
                setDropdownOpen(false);
              }}
            >
              <Flag
                code={cuisine.code}
                style={{ height: "20px", width: "20px" }}
                className="mr-2"
              />
              {cuisine.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
