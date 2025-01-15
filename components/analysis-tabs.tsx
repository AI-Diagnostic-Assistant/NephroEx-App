import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { Classification } from "@/lib/types";
import {ClassificationCard} from "@/components/classification-card";


const AnalysisTabs = ({ classifications }: { classifications: Classification[] }) => {

    const typeMapper = (type: string): string => {
        const mapping: { [key: string]: string } = {
            cnn: "Image analysis",
            svm: "Renogram analysis",
        };
        return mapping[type] || "Unknown Type";
    };

    return (
        <Tabs defaultValue={classifications[0]?.type} className="w-full">
                <TabsList >
                    {classifications.map((item) => (
                        <TabsTrigger
                            key={item.id}
                            value={item.type}
                            className="relative px-4 py-2 text-gray-700 focus:outline-none data-[state=active]:text-primary-brand"
                        >
                            {typeMapper(item.type)}
                        </TabsTrigger>

                    ))}
                </TabsList>

            {classifications.map((classification) => (
                <TabsContent key={classification.id} value={classification.type}>
                    <ClassificationCard classification={classification} />
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default AnalysisTabs;