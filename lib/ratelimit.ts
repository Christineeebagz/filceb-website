// import redis from "@/database/redis";
// import { Ratelimit } from "@upstash/ratelimit";

// const ratelimit = new Ratelimit({
//   redis,
//   limiter: Ratelimit.fixedWindow(5, "1m"),
//   analytics: true,

//   prefix: "@upstash/ratelimit",
// });

// export default ratelimit;

// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(10, "10 s"),
//   analytics: false, // Disables analytics which uses scripts
//   prefix: "ratelimit", // Optional but recommended
// });

// export default ratelimit;
