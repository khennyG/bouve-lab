import { notFound } from "next/navigation";
import { readyUseCases, type UseCase } from "../_data";
import UseCaseDetailClient from "./UseCaseDetailClient";

export default async function UseCaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = readyUseCases.find((u: UseCase) => u.id === slug);
  if (!useCase) return notFound();
  return <UseCaseDetailClient caseData={useCase} />;
}
