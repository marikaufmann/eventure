import { generateBreadcrumbs } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
export type BreadcrumbType = {
  label: string;
  href: string;
  isCurrent: boolean;
};
const Breadcrumbs = () => {
  const location = useLocation();
  const breadcrumbs: BreadcrumbType[] = generateBreadcrumbs(location.pathname);
  const isSubCategoryPage = location.pathname.match(
    /^\/categories\/[^/]+\/[^/]+$/
  );

  return (
    <Breadcrumb>
      <BreadcrumbList className={isSubCategoryPage ? "text-black " : ""}>
        <BreadcrumbItem >
          <BreadcrumbLink className={isSubCategoryPage ? "hover:text-primary" : ""} href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {breadcrumbs.map((breadcrumb, index) =>
          breadcrumb.isCurrent ? (
            <BreadcrumbItem key={index}>
              <BreadcrumbPage
                className={isSubCategoryPage ? "text-primary" : ""}
              >
                {breadcrumb.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={breadcrumb.href} className={isSubCategoryPage ? "hover:text-primary" : ""}>
                  {breadcrumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
