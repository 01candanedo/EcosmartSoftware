interface RewardsPutResponse{
  ok: boolean;
  message: string;
}

interface Rewards{
  ammount: number;
}

interface RewardsResponse{
  ok: boolean
  rewards: number;
}

export {RewardsPutResponse, Rewards, RewardsResponse}
