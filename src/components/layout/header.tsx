
import { useState } from "react";
import { Bell, HelpCircle, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  
  return (
    <header
      className={cn(
        "flex h-14 items-center gap-4 border-b border-border bg-background px-4 lg:px-6",
        className
      )}
    >
      <div className="w-full flex items-center gap-4">
        <div className="hidden md:flex-1 md:flex relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8 bg-muted/30"
          />
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback>HC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {showSearch && (
        <div className="absolute top-14 left-0 right-0 p-4 bg-background border-b border-border md:hidden z-10">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8"
            />
          </div>
        </div>
      )}
    </header>
  );
}
