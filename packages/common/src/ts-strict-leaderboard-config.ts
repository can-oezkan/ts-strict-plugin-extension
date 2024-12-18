export interface TSStrictLeaderboardConfig {
  /**
   * The `initialCommit` specifies the commit which added all the ignore comments to the files.
   * When this option is `undefined`, the `initialCommit` will be initialized as the first
   * commit, that added the ignore comments.
   */
  initialCommit?: string;
}
