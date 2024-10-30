import type { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import Map from "../Map";

interface Props {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  data: {
    coordinates: [number, number];
    title: string | null;
    description: string | null;
  };
}

const DrawerWithMap: FC<Props> = ({ data, ...props }) => {
  return (
    <Drawer open={props.isOpen} onOpenChange={props.onOpenChange} handleOnly>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{data.title}</DrawerTitle>
          <DrawerDescription>{data.description}</DrawerDescription>
        </DrawerHeader>
        <Map coordinates={data.coordinates} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export type { Props as DrawerWithMapProps };
export default DrawerWithMap;
