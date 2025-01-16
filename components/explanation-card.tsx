import RenogramChart from "@/components/renogram-chart";
import {Explanation} from "@/lib/types";

interface ExplanationCardProps {
    explanation: Explanation;
}
export async function ExplanationCard(props: ExplanationCardProps) {

    const { explanation } = props

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full">
                {explanation.roiActivity?.length > 0 && (
                    <div className="bg-primary-foreground px-3 py-2 rounded-lg w-full">
                        <h3> Renogram </h3>
                        <div className="w-full">
                            <RenogramChart
                                datasets={[
                                    {
                                        label: "Left Activities",
                                        data: explanation.roiActivity[0]
                                    },
                                    {
                                        label: "Right Activities",
                                        data: explanation.roiActivity[1]
                                    },
                                    {
                                        label: "Total Activities",
                                        data: explanation.roiActivity[2]
                                    },
                                ]}
                                title="Renogram: Activities Over Time"
                            />
                        </div>
                    </div>
                )}
            </div>
            <div>
                {explanation.description && (
                    <div className="bg-primary-foreground px-3 py-2 rounded-lg">
                        <h3>Reasoning</h3>
                        <p>{explanation.description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}