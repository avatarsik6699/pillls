import { useThemeParams } from "@telegram-apps/sdk-react";
import { useState } from "react";
import { createQuery } from "react-query-kit";

import { api } from "@/shared/api";
import { PharmacyCard } from "@/widgets/PharmacyCard/PharmacyCard";
import Search from "@/widgets/Search/Search";

interface PharmacyItem {
  name: string;
  country: string;
  pharmacy: string;
  address: string;
  price: string;
  cost: string;
}

const usePharmacyList = createQuery<
  { items_found: number; items: PharmacyItem[] },
  { searchValue: string }
>({
  queryKey: ["pharmacy-list"],
  retry: false,
  staleTime: Infinity,
  fetcher: async variables => {
    console.log(variables);
    return api
      .get(`data`, { searchParams: { searchValue: variables.searchValue } })
      .then(res => res.json());
  },
});

export const IndexPage: React.FC = () => {
  const themeParams = useThemeParams();

  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const pharmacyList = usePharmacyList({
    variables: { searchValue },
    enabled: Boolean(searchValue),
  });

  console.log(pharmacyList);

  return (
    <main className="p-3">
      <Search
        hints={[
          { value: "calendar", label: "Calendar" },
          { value: "search-emoji", label: "Search Emoji" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Cala" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Calculator" },
          { value: "calculator", label: "Calculator" },
        ]}
      />
      <ul className="flex flex-col gap-5">
        <li>
          <PharmacyCard />
        </li>
        <li>
          <PharmacyCard />
        </li>
        <li>
          <PharmacyCard />
        </li>
      </ul>
      {/* <Input
        after={
          <IconButton
            onClick={() => {
              setSearchValue(inputValue);
            }}
            size="l"
            mode="bezeled">
            <IoIosSearch />
          </IconButton>
        }
        autoFocus
        header="Введите название препарата"
        placeholder="Флуоксетин, анальгин..."
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value || "");
        }}
      />
      {pharmacyList.isLoading && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="l" />
        </div>
      )}
      {pharmacyList.isSuccess && (
        <>
          {Number(pharmacyList.data.items_found) === 0 && (
            <div className="flex h-96 items-center justify-center">
              <Text>Ничего не найдено</Text>
            </div>
          )}
          {Number(pharmacyList.data.items_found) > 0 && (
            <>
              <div style={{ background: themeParams.bgColor }} className={`flex items-center gap-2 p-3`}>
                <Text weight="3">Найдено элементов: </Text>
                <Badge type="number">{pharmacyList.data?.items_found}</Badge>
              </div>
              <List>
                {pharmacyList.data?.items?.map((item, idx) => {
                  return (
                    <>
                      <Section key={idx} header={item.name} footer={item.address}>
                        <Cell subtitle="Цена" hovered={false} before={<GiPayMoney />}>
                          {item.cost}
                        </Cell>
                        <Cell subtitle="Производитель" hovered={false} before={<IoFlagOutline />}>
                          {item.country}
                        </Cell>
                        <Cell subtitle="Аптека" hovered={false} before={<MdLocalPharmacy />}>
                          {item.pharmacy}
                        </Cell>
                        <Cell subtitle="Дата последнего обновления" hovered={false} before={<CiCalendarDate />}>
                          {item.price}
                        </Cell>
                      </Section>
                      <Divider />
                    </>
                  );
                })}
              </List>
            </>
          )}
        </>
      )} */}
    </main>
  );
};
