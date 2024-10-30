import { useThemeParams } from "@telegram-apps/sdk-react";
import { Spinner } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import PositionsCountFindBySearch from "@/entities/PositionsCountFindBySearch/PositionsCountFindBySearch";
import FilterByProductTradeNames from "@/features/Filter/ui/FilterByProductTradeNames";
import Filters from "@/features/Filters/Filters";
import { usePaginationState } from "@/features/Pagination/hooks/usePaginationState";
import Pagination from "@/features/Pagination/Pagination";
import SortFilter from "@/features/SortFilter/SortFilter";
import type { PositionsListBodyDtoSortBy } from "@/shared/api/models";
import { useQueryParams } from "@/shared/hooks/useQueryParams";
import type { DrawerWithMapProps } from "@/widgets/Map/DrawerWithMap/DrawerWithMap";
import DrawerWithMap from "@/widgets/Map/DrawerWithMap/DrawerWithMap";
import Position from "@/widgets/Position/Position";
import { useSearchState } from "@/widgets/Search/hooks/useSearchState";
import Search from "@/widgets/Search/Search";

import { usePositionQuery } from "./model/usePositionQuery";
import { useProductListQuery } from "./model/useProductListQuery";
import { useTipListQuery } from "./model/useTipListQuery";

type Filters = {
  sortBy: PositionsListBodyDtoSortBy;
};

type QueryParams = {
  q?: string;
  tradeProductId?: string;
  tradeProductName?: string;
};

export const IndexPage: React.FC = () => {
  const themeParams = useThemeParams();
  const qp = useQueryParams<QueryParams>();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapData, setMapData] = useState<DrawerWithMapProps["data"]>({
    title: null,
    description: null,
    coordinates: [30.336679, 59.930315],
  });
  const [filters, setFilters] = useState<Filters>({
    sortBy: "default",
  });

  const pagination = usePaginationState();
  const search = useSearchState({
    onSelect: value => qp.add({ q: value }),
    onChangeInputValue: value => {
      if (!value) qp.remove(["tradeProductId", "tradeProductName", "q"]);
    },
  });

  const tips = useTipListQuery({
    variables: { q: search.debInputValue },
  });

  const tradeProductsNames = useProductListQuery({
    variables: { name: qp.get("q") },
  });

  const positions = usePositionQuery({
    variables: {
      ...filters,
      page: pagination.page,
      product: {
        id: qp.get("tradeProductId")!,
        name: qp.get("tradeProductName")!,
      },
    },
  });

  useEffect(function setInitialBaseProductNameIfExistsFx() {
    const baseProductName = qp.get("q");

    if (baseProductName) {
      search.onSelectTip(baseProductName);
    }
  }, []);

  useEffect(
    function changeProductTradeNameFx() {
      const { data } = tradeProductsNames;

      if (data) {
        const all = data.products.find(item => item.label === "Все");

        if (all) {
          qp.add({ tradeProductName: all.name, tradeProductId: all.id });
        } else if (data.active) {
          qp.add({
            tradeProductName: data.active.name,
            tradeProductId: data.active.id,
          });
        }
      }
    },
    [tradeProductsNames.data]
  );
  return (
    <main>
      <Search
        state={search}
        tips={{
          list: tips.data?.list || [],
          count: tips.data?.count || 0,
          meta: {
            status: tips.status,
          },
        }}
      />

      {tradeProductsNames.status === "success" &&
        tradeProductsNames.data.products.length > 0 && (
          <Filters>
            <FilterByProductTradeNames
              onValueChange={value => {
                pagination.onChangePage(1);

                const tradeProduct = tradeProductsNames.data.products.find(
                  item => item.id === value
                );

                if (tradeProduct) {
                  qp.add({
                    tradeProductName: tradeProduct.name,
                    tradeProductId: tradeProduct.id,
                  });
                }
              }}
              value={qp.get("tradeProductId")}
              items={tradeProductsNames.data.products.map(item => ({
                value: item.id,
                text: item.label,
              }))}
            />
            <SortFilter
              onCheckedChange={value => {
                pagination.onChangePage(1);
                setFilters(prev => ({
                  ...prev,
                  sortBy: value ? "price" : "default",
                }));
              }}
            />
          </Filters>
        )}
      {positions.status === "success" && (
        <PositionsCountFindBySearch
          count={positions.data.count}
          product={{ name: qp.get("tradeProductName") || "" }}
        />
      )}
      {positions.isLoading && (
        <section className="flex h-[calc(100dvh-210px)] items-center justify-center">
          <Spinner size="l" className="text-neutral-500" />
        </section>
      )}
      <ScrollArea className="h-[calc(100dvh-220px)] overflow-auto">
        <ul className="flex flex-col gap-y-5 p-4">
          {positions.data?.positions.map((item, idx) => (
            <li key={idx}>
              <Position
                price={item.price}
                pharmacy={{
                  ...item.pharmacy,
                  onOpenMapByAddress: () => {
                    setMapData({
                      title: item.pharmacy.name,
                      description: item.pharmacy.address.street,
                      coordinates: [
                        Number.parseFloat(item.pharmacy.address.lat),
                        Number.parseFloat(item.pharmacy.address.lng),
                      ],
                    });

                    setIsMapOpen(true);
                  },
                }}
                product={item.product}
              />
            </li>
          ))}
        </ul>
      </ScrollArea>
      <section className="flex items-center justify-center py-2">
        {positions.status === "success" &&
          positions.data.pagination.end > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={positions.data.pagination.end}
              onChangePage={pagination.onChangePage}
            />
          )}
      </section>

      <DrawerWithMap
        data={mapData}
        isOpen={isMapOpen}
        onOpenChange={setIsMapOpen}
      />
    </main>
  );
};
