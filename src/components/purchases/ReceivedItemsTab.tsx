
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReceivedItem {
  id: string;
  poId: string;
  item: string;
  quantity: number;
  date: string;
}

interface ReceivedItemsTabProps {
  receivedItems: ReceivedItem[];
}

const ReceivedItemsTab = ({ receivedItems }: ReceivedItemsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Received Items</CardTitle>
        <CardDescription>Track items received from vendors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3">Receipt #</th>
                <th scope="col" className="px-6 py-3">PO #</th>
                <th scope="col" className="px-6 py-3">Item</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Date Received</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {receivedItems.map((item) => (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 font-medium">{item.id}</td>
                  <td className="px-6 py-4">{item.poId}</td>
                  <td className="px-6 py-4">{item.item}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReceivedItemsTab;
