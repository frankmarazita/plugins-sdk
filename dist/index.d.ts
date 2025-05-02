type T = Record<string, any> | undefined;
declare function useContext(): {
    workspace: T;
    property: T;
    boundary: T;
    task: T;
    record: T;
};
declare function ping(): Promise<void>;
declare function flyTo(lat: number, lon: number): Promise<void>;
declare function setZoom(zoom: number): Promise<void>;
declare const sensand: {
    useContext: typeof useContext;
    ping: typeof ping;
    flyTo: typeof flyTo;
    setZoom: typeof setZoom;
};

export { sensand };
