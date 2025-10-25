import { notFound } from "next/navigation";
import { USE_CASES } from "../_data.chs";
import UseCaseDetailClient from "./UseCaseDetailClient";

export default function UseCaseDetailPage({ params }: { params: { slug: string } }) {
  const useCase = USE_CASES.find((u) => u.id === params.slug);
  if (!useCase) return notFound();
  return <UseCaseDetailClient useCase={useCase} />;
}
