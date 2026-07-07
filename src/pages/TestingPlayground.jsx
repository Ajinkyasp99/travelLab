import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TestingPlayground() {
  const [activeTab, setActiveTab] = useState("forms");
  
  // Form state
  const [formEmail, setFormEmail] = useState("");
  const [formError, setFormError] = useState("");
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formEmail.includes("@")) {
      setFormError("Invalid email address");
    } else {
      setFormError("");
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Selenium Testing Playground</h1>
      <p className="text-muted-foreground mb-8">Practice automation scripts on these components.</p>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-2">
          {['forms', 'tables', 'modals'].map(tab => (
            <Button 
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              className="w-full justify-start capitalize"
              onClick={() => setActiveTab(tab)}
              data-testid={`playground-tab-${tab}`}
            >
              {tab}
            </Button>
          ))}
        </div>
        
        <div className="flex-1">
          {activeTab === "forms" && (
            <Card>
              <CardHeader>
                <CardTitle>Form Validation</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-4 max-w-sm">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input 
                      data-testid="playground-email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                    />
                    {formError && <p className="text-destructive text-sm mt-1" data-testid="playground-email-error">{formError}</p>}
                  </div>
                  <Button type="submit" data-testid="playground-submit">Submit Form</Button>
                </form>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "tables" && (
            <Card>
              <CardHeader>
                <CardTitle>Data Table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50 text-left">
                        <th className="p-3 font-medium">ID</th>
                        <th className="p-3 font-medium">Name</th>
                        <th className="p-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map(i => (
                        <tr key={i} className="border-b" data-testid={`table-row-${i}`}>
                          <td className="p-3">#{i}</td>
                          <td className="p-3">User {i}</td>
                          <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Active</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "modals" && (
            <Card>
              <CardHeader>
                <CardTitle>Modal Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button data-testid="playground-open-modal" onClick={() => alert('Modal opened! (Mock)')}>
                  Open Modal
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
