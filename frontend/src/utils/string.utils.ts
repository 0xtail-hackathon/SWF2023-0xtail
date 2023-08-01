export function shortenAddr(addr: string | undefined) {
    if (!addr) return "";
    if (addr.startsWith("0x")) return addr.slice(0, 6) + "..." + addr.slice(-4);
    else return "0x" + addr.slice(0, 4) + addr.slice(-4);
}
