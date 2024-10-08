import { Avatar, AvatarImage } from "../ui/avatar";
import { Info, X } from "lucide-react";
import { useSelectedUser } from "@/store/useSelectedUser";

const ChatTopBar = () => {
  const { selectedUser } = useSelectedUser();
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex items-center justify-center">
          <AvatarImage
            src={selectedUser?.image || "/user-placeholder.png"}
            alt="userImage"
            className="w-10 h-10 rounded-full"
          />
        </Avatar>
        <span className="font-medium">{selectedUser?.name}</span>
      </div>

        <div className="flex gap-2">
          <Info className="text-muted-foreground cursor-pointer hover:text-primary" />
          <X className="text-muted-foreground cursor-pointer hover:text-primary" />
        </div>
    </div>
  );
};
export default ChatTopBar;
