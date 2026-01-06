import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function InspirasiAdmin() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inspirasi</h1>
        <Button className="bg-[#80916f] hover:bg-[#6f7f60]">
          + Tambah Post
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th>Judul</th>
                <th>Kategori</th>
                <th>Author</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td>Makna Mandiri</td>
                <td>One Day Motivation</td>
                <td>Ust. Ahmad</td>
                <td className="space-x-2">
                  <button className="text-blue-600">Edit</button>
                  <button className="text-red-600">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
