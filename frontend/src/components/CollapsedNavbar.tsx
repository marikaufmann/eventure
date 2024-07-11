import { mainCategories, locations, organize } from "@/lib/config";
import { handleLinkFormat } from "@/lib/utils";
import { Menu } from "antd";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
type MenuItem = {
  key: string;
  label: React.ReactNode;
  children?: MenuItem[];
};
const CollapsedMenu = ({
  setIsMenuOpened,
}: {
  setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);
  const getLevelKeys = (items: MenuItem[]): Record<string, number> => {
    const key: Record<string, number> = {};
    const func = (items: MenuItem[], level = 1) => {
      items.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items);
    return key;
  };
  const onOpenChange = (openKeys: string[]) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };
  const menu: MenuItem[] = useMemo(() => {
    return [
      {
        key: "1",
        label: "Categories",
        children: mainCategories.map((cat) => ({
          key: cat.title,
          label:
            cat.title === "View all" ? (
              <Link to={`/categories`}>{cat.title}</Link>
            ) : (
              <Link to={`/categories/${handleLinkFormat(cat.title)}`}>
                {cat.title}
              </Link>
            ),
        })),
      },
      {
        key: "2",
        label: "Locations",
        children: locations.map((cat) => ({
          key: cat.title,
          label:
            cat.title === "Countries" ? (
              <Link to={`/locations`}>{cat.title}</Link>
            ) : (
              <Link to={`/online`}>{cat.title}</Link>
            ),
        })),
      },
      {
        key: "3",
        label: "Organize",
        children: organize.map((cat) => ({
          key: cat.title,
          label:
            cat.title === "Create event" ? (
              <Link to={`/organize/create-event`}>{cat.title}</Link>
            ) : (
              <Link to={`/organize/manage-events`}>{cat.title}</Link>
            ),
        })),
      },
    ];
  }, []);
  const levelKeys = getLevelKeys(menu);
  return (
    <div className="inset-0 bg-white  min-h-screen w-full fixed z-10 flex flex-col max-lg:py-1">
      <div className="border-gray-300 border-b px-6 mt-2 h-[50px] flex gap-4 items-center ">
        <button
          className="hover:bg-gray-100 rounded-full w-10 h-10 bg-white text-black flex justify-center items-center "
          onClick={() => setIsMenuOpened(false)}
        >
          <X className="w-6 h-6" />
        </button>
        <Link to="/" className="text-xl text-primary font-bold">
          EVENTURE
        </Link>
      </div>
      <div className=" flex flex-col text-text font-bold ">
        <Menu
          className="bg-transparent"
          mode="inline"
          defaultSelectedKeys={[]}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          items={menu}
          onClick={() => setIsMenuOpened(false)}
        />
      </div>
    </div>
  );
};

export default CollapsedMenu;
