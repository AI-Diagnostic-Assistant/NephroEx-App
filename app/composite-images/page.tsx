import { createClient } from '@/utils/supabase/server';

export default async function CompositeImages() {
    const supabase = await createClient();
    const { data: notes } = await supabase.from("composite_image").select();

    return <pre>{JSON.stringify(notes, null, 2)}</pre>
}