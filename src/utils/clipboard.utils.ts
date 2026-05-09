export async function copyOnClipboard(
    text: string,
    setCopied?: (val: boolean) => void
) {
    try {
        await navigator.clipboard.writeText(text);
        if (setCopied) {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    } catch (err) {
        alert("Can't copy");
        console.error("Failed to copy:", err);
    }
}