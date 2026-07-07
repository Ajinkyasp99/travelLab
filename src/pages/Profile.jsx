import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <User size={40} />
              </div>
              <h2 className="text-xl font-bold">{currentUser?.name}</h2>
              <p className="text-muted-foreground mb-4">{currentUser?.role}</p>
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <User className="text-muted-foreground" size={20} />
                <div>
                  <p className="text-sm font-medium">Full Name</p>
                  <p className="text-muted-foreground">{currentUser?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-muted-foreground" size={20} />
                <div>
                  <p className="text-sm font-medium">Email Address</p>
                  <p className="text-muted-foreground">{currentUser?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Shield className="text-muted-foreground" size={20} />
                <div>
                  <p className="text-sm font-medium">Account Type</p>
                  <p className="text-muted-foreground">{currentUser?.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Settings className="text-muted-foreground" size={20} />
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive booking updates and offers</p>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="accent-primary" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
