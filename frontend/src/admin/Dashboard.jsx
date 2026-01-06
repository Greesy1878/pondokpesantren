import { Card, CardContent } from "../components/ui/card";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Posting Inspirasi", value: 24 },
          { label: "Pengajar", value: 12 },
          { label: "Galeri", value: 56 },
          { label: "Jalur PMB", value: 3 },
        ].map((item, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-3xl font-bold text-[#80916f]">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
