import {decimalToPercentage, roundListToThreeSignificantDigits} from "@/lib/utils";
import { Classification } from "@/lib/types";
import {ExplanationCard} from "@/components/explanation-card";


interface ClassificationCardProps {
    classification: Classification;
}
export async function ClassificationCard(props: ClassificationCardProps) {

    const { classification} = props

    return (
        <div className="flex gap-28 w-full">
            <div className="flex flex-col gap-4 xl:min-w-96">
                <h2>Classification Result</h2>
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 bg-primary-foreground px-3 py-2 rounded-lg">
                        <h3>CKD degree</h3>
                        <h2 className="text-primary-brand">
                            {classification.prediction}
                        </h2>
                    </div>
                    <div className="flex flex-col flex-1 bg-primary-foreground px-3 py-2 rounded-lg">
                        <h3>Confidence</h3>
                        <h2>
                            {decimalToPercentage(
                                roundListToThreeSignificantDigits([
                                    classification.confidence[0],
                                ])[0],
                            )}{" "}
                            %
                        </h2>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 xl:min-w-96 w-full">
                <h2>Explanation</h2>
                {classification.explanation?.map((explanation, index) => (
                    <div key={index} className="flex flex-col gap-4 w-full">
                        <ExplanationCard explanation={explanation}/>
                    </div>
                ))}
            </div>
        </div>

    )
}