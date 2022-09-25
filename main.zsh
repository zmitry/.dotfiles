PATH=$PATH:$HOME/bin
export DOTFILES=$HOME/.dotfiles

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
source ~/projects/fzf-tab/fzf-tab.plugin.zsh
source $DOTFILES/path.zsh
source $DOTFILES/aliases.zsh
source $DOTFILES/variables.zsh

