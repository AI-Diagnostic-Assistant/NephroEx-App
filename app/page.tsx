import {createClient} from "@/utils/supabase/server";
import FileUpload from "@/components/FileUpload";

export default async function Index() {
    const supabase = await createClient();

    return (
        <div>
            <FileUpload/>
        </div>
    );

}
