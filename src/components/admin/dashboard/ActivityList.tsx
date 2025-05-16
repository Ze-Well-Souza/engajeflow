
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  timestamp: string;
}

interface ActivityListProps {
  activities: Activity[];
  title: string;
  description: string;
  linkTo: string;
  linkText: string;
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  title,
  description,
  linkTo,
  linkText,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex justify-between items-center border-b pb-2 last:border-0">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">{activity.user}</span> • {activity.target}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link to={linkTo}>
            {linkText} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityList;
