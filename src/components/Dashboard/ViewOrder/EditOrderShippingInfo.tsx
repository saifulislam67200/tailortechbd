"use client";
import SelectionBox from "@/components/ui/SelectionBox";
import TextArea from "@/components/ui/TextArea";
import {
  useGetDistrictsQuery,
  useGetDivisionsQuery,
  useGetUpozilasQuery,
} from "@/redux/features/geoLocation/geoLocation.api";
import { IShippingAddress } from "@/types/order";
import { useEffect, useRef, useState } from "react";

interface IProps {
  shippingInfo: IShippingAddress;
  onChange: (shippingInfo: IShippingAddress) => void;
}

const EditOrderShippingInfo: React.FC<IProps> = ({ shippingInfo, onChange }) => {
  const [locationId, setLocationId] = useState({
    division_id: "",
    district_id: "",
  });
  const { data: divisions } = useGetDivisionsQuery(undefined);
  const { data: districts } = useGetDistrictsQuery(locationId.division_id, {
    skip: !locationId.division_id,
  });
  const { data: upazila } = useGetUpozilasQuery(locationId.district_id, {
    skip: !locationId.district_id,
  });
  const [shippingAddress, setShippingAddress] = useState(shippingInfo);
  const initRef = useRef({ division: false, district: false });
  useEffect(() => {
    if (!divisions || initRef.current.division) return;

    const chosenDivision = divisions.find((d) => d.name === shippingInfo.division) ?? divisions[0];

    if (chosenDivision) {
      setLocationId({ division_id: chosenDivision.id, district_id: "" });
      setShippingAddress((prev) => ({
        ...prev,
        division: chosenDivision.name,
        district: prev.district || "",
        upazila: prev.upazila || "",
      }));
      initRef.current.division = true;
    }
  }, [divisions, shippingInfo.division]);
  useEffect(() => {
    if (!districts || !locationId.division_id || initRef.current.district) return;

    const chosenDistrict = districts.find((d) => d.name === shippingInfo.district) ?? districts[0];

    if (chosenDistrict) {
      setLocationId((prev) => ({ ...prev, district_id: chosenDistrict.id }));
      setShippingAddress((prev) => ({
        ...prev,
        district: chosenDistrict.name,
        upazila: prev.upazila || "",
      }));
      initRef.current.district = true;
    }
  }, [districts, locationId.division_id, shippingInfo.district]);
  return (
    <div className="flex w-full flex-col gap-[10px] rounded-[6px] bg-white p-[15px]">
      <div className="flex w-full flex-col gap-[8px]">
        <label className="text-[14px] font-[700] text-strong" htmlFor="name">
          Division *
        </label>
        <SelectionBox
          defaultValue={{ label: shippingAddress.division, value: "" }}
          data={divisions?.map((d) => ({ label: d.name, value: d.id })) || []}
          onSelect={(e) => {
            setLocationId({ division_id: e.value, district_id: "" });
            setShippingAddress({
              ...shippingAddress,
              division: e.label,
              upazila: "",
              district: "",
            });
            onChange({
              ...shippingAddress,
              division: e.label,
              upazila: "",
              district: "",
            });
          }}
        />
      </div>
      <div className="flex w-full flex-col gap-[8px]">
        <label className="text-[14px] font-[700] text-strong" htmlFor="name">
          District *
        </label>
        <SelectionBox
          displayValue={shippingAddress.district}
          defaultValue={{ label: shippingAddress.district, value: "" }}
          data={districts?.map((d) => ({ label: d.name, value: d.id })) || []}
          onSelect={(e) => {
            setLocationId({ ...locationId, district_id: e.value });
            setShippingAddress({
              ...shippingAddress,
              district: e.label,
              upazila: "",
            });
            onChange({
              ...shippingAddress,
              district: e.label,
              upazila: "",
            });
          }}
        />
      </div>
      <div className="flex w-full flex-col gap-[8px]">
        <label className="text-[14px] font-[700] text-strong" htmlFor="name">
          Upazila/City *
        </label>
        <SelectionBox
          displayValue={shippingAddress.upazila}
          defaultValue={{ label: shippingAddress.upazila, value: "" }}
          data={upazila?.map((d) => ({ label: d.name, value: d.id })) || []}
          onSelect={(e) => {
            setShippingAddress({
              ...shippingAddress,
              upazila: e.label,
            });
            onChange({
              ...shippingAddress,
              upazila: e.label,
            });
          }}
        />
      </div>
      <div className="flex w-full flex-col gap-[8px]">
        <label className="text-[14px] font-[700] text-strong" htmlFor="name">
          Shipping Address
        </label>
        <TextArea
          onChange={(e) => {
            setShippingAddress({
              ...shippingAddress,
              address: e.target.value,
            });
            onChange({
              ...shippingAddress,
              address: e.target.value,
            });
          }}
          name="shippingAddress.address"
          defaultValue={shippingAddress.address}
          placeholder="Shipping Address"
        />
      </div>
    </div>
  );
};

export default EditOrderShippingInfo;
