export default async function Analysis({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <div>
      <h1>Analysis {id}</h1>
    </div>
  );
}
