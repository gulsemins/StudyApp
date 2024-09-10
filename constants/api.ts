import Constants from "expo-constants";

// export const uri = Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8002')!;
export const uri = "http://" + (Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8002'))!;
console.log("Constructed URI: " + uri);
