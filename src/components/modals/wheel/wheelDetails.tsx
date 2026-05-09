import IconBase from "@/components/icon/iconBase";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICONS } from "@/constants/icons";
import { WheelModalTab } from "@/types/modal.types";

type Props = {
  setActiveTab: (tab: WheelModalTab) => void;
};

export default function WheelDetails({ setActiveTab }: Props) {
  return (
    <>
      <div className="px-2 overflow-auto custom-scrollbar max-h-[calc(100vh-500px)]">
        <div className="flex flex-col">
          <div className="sticky top-0 bg-background shadow-md z-10">
            <Table className="shadow-xl">
              <TableHeader className="">
                <TableRow className="!bg-transparent">
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="w-[110px]">Possibility</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>

          <div className="">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1BTC</TableCell>
                  <TableCell variant="danger">Locked</TableCell>
                  <TableCell>20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>50BTC</TableCell>
                  <TableCell variant="success">Unlocked</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Button
        onClick={() => setActiveTab("wheel")}
        type="button"
        className="w-full border-transparent rounded-xl"
        variant={"default"}
        size={"default"}
      >
        <IconBase icon={ICONS.ARROW_RIGHT} className="rotate-180 size-4" />
        Go back
      </Button>
    </>
  );
}
