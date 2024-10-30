import { Hospital, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Pharmacy, Position, Product } from "@/shared/api/models";
import { utils } from "@/shared/utils/utils";

type Props = React.ComponentProps<typeof Card> &
  Pick<Position, "price"> & {
    product: Pick<Product, "id" | "name" | "originCountry" | "dosage">;
    pharmacy: Pick<
      Pharmacy,
      "id" | "name" | "address" | "phone" | "allhours" | "updateTime"
    > & { onOpenMapByAddress: () => void };
  };

const Position = ({
  className,
  product,
  pharmacy,
  ...props
}: React.PropsWithoutRef<Props>) => {
  return (
    <Card
      {...props}
      className={cn("max-w-full shadow-md pl-5 pr-5 pt-3 pb-3", className)}
    >
      <CardHeader className="flex flex-row items-center justify-between p-0">
        <CardTitle className="text-xl font-semibold">
          {utils.string.capitalizeFirstLetter(product.name)}
        </CardTitle>
        <CardTitle className="inline-flex gap-1 text-base">
          {props.price} <span className="self-end text-sm">₽</span>
        </CardTitle>
      </CardHeader>

      <CardDescription className="pb-3">
        <span>{product.originCountry}</span> | <span>{product.dosage}</span>
      </CardDescription>

      <CardContent className="flex flex-col gap-1 p-0">
        <Button
          variant="link"
          className="flex h-auto w-max items-center gap-1 whitespace-normal p-0 text-sm text-neutral-500"
        >
          <Hospital className="size-3" />
          {pharmacy.name}
        </Button>

        <Button
          onClick={pharmacy.onOpenMapByAddress}
          variant="link"
          className="flex h-auto w-max items-center gap-1 whitespace-normal p-0 text-sm text-neutral-500"
        >
          <MapPin className="size-3" /> {pharmacy.address.street}
        </Button>

        <a
          className="flex h-auto w-max items-center gap-1 whitespace-normal p-0 text-sm text-neutral-500"
          href={`tel:${pharmacy.phone || "#"}`}
        >
          <Phone className="size-3" /> {pharmacy.phone || "---"}
        </a>
      </CardContent>
    </Card>
  );
};

export default Position;
