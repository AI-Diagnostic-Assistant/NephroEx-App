import Image from "next/image";

type Props = {
  signedUrls: {
    error: string | null;
    path: string | null;
    signedUrl: string;
  }[];
};

export default function HeatMaps({ signedUrls }: Props) {
  return (
    <div className="flex gap-1 flex-wrap">
      {signedUrls?.map((signedUrl, index) => (
        <div key={signedUrl.signedUrl}>
          {signedUrls && (
            <Image
              quality={100}
              src={signedUrl.signedUrl}
              width={144}
              height={144}
              alt="Heatmap of composite dicom image"
              className="mx-auto"
            />
          )}
        </div>
      ))}
    </div>
  );
}
