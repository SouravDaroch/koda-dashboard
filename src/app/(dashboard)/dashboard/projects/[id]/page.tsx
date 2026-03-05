interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetails({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Project {id}
        </h1>
        <p className="text-gray-500 mt-1">
          Detailed overview of this project.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm text-gray-500">Status</h3>
          <p className="text-lg font-semibold mt-1">In Progress</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm text-gray-500">Tasks</h3>
          <p className="text-lg font-semibold mt-1">24 Tasks</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm text-gray-500">Due Date</h3>
          <p className="text-lg font-semibold mt-1">12 Mar 2026</p>
        </div>
      </div>
    </div>
  );
}