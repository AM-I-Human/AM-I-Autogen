"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2209],{68023:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>g,frontMatter:()=>a,metadata:()=>r,toc:()=>c});var s=t(85893),o=t(11151);const a={custom_edit_url:"https://github.com/microsoft/autogen/edit/main/notebook/agentchat_chess.ipynb",description:"Use AutoGen to create two agents that are able to play chess",source_notebook:"/notebook/agentchat_chess.ipynb",tags:["chess"],title:"Chess Game Playing While Chitchatting by GPT-4 Agents"},i="Chess Game Playing While Chitchatting by GPT-4 Agents",r={id:"notebooks/agentchat_chess",title:"Chess Game Playing While Chitchatting by GPT-4 Agents",description:"Use AutoGen to create two agents that are able to play chess",source:"@site/docs/notebooks/agentchat_chess.mdx",sourceDirName:"notebooks",slug:"/notebooks/agentchat_chess",permalink:"/autogen/docs/notebooks/agentchat_chess",draft:!1,unlisted:!1,editUrl:"https://github.com/microsoft/autogen/edit/main/notebook/agentchat_chess.ipynb",tags:[{label:"chess",permalink:"/autogen/docs/tags/chess"}],version:"current",frontMatter:{custom_edit_url:"https://github.com/microsoft/autogen/edit/main/notebook/agentchat_chess.ipynb",description:"Use AutoGen to create two agents that are able to play chess",source_notebook:"/notebook/agentchat_chess.ipynb",tags:["chess"],title:"Chess Game Playing While Chitchatting by GPT-4 Agents"},sidebar:"notebooksSidebar",previous:{title:"Handling A Long Context via `TransformChatHistory`",permalink:"/autogen/docs/notebooks/agentchat_capability_long_context_handling"},next:{title:"Conversations with Chat History Compression Enabled",permalink:"/autogen/docs/notebooks/agentchat_compression"}},l={},c=[{value:"Requirements",id:"requirements",level:2},{value:"Set your API Endpoint",id:"set-your-api-endpoint",level:2},{value:"Define Agents",id:"define-agents",level:2},{value:"Construct Agents",id:"construct-agents",level:2},{value:"Start Game",id:"start-game",level:2}];function h(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",img:"img",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"chess-game-playing-while-chitchatting-by-gpt-4-agents",children:"Chess Game Playing While Chitchatting by GPT-4 Agents"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://colab.research.google.com/github/microsoft/autogen/blob/main/notebook/agentchat_chess.ipynb",children:(0,s.jsx)(n.img,{src:"https://colab.research.google.com/assets/colab-badge.svg",alt:"Open In Colab"})}),"\n",(0,s.jsx)(n.a,{href:"https://github.com/microsoft/autogen/blob/main/notebook/agentchat_chess.ipynb",children:(0,s.jsx)(n.img,{src:"https://img.shields.io/badge/Open%20on%20GitHub-grey?logo=github",alt:"Open on GitHub"})})]}),"\n",(0,s.jsxs)(n.p,{children:["AutoGen offers conversable agents powered by LLM, tool, or human, which\ncan be used to perform tasks collectively via automated chat. This\nframework allows tool use and human participation through multi-agent\nconversation. Please find documentation about this feature\n",(0,s.jsx)(n.a,{href:"https://microsoft.github.io/autogen/docs/Use-Cases/agent_chat",children:"here"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["This notebook is modified based on\n",(0,s.jsx)(n.a,{href:"https://github.com/ekzhu/FLAML/blob/evaluation/evaluation/chess/play_chess.ipynb",children:"https://github.com/ekzhu/FLAML/blob/evaluation/evaluation/chess/play_chess.ipynb"})]}),"\n",(0,s.jsx)(n.h2,{id:"requirements",children:"Requirements"}),"\n",(0,s.jsxs)(n.admonition,{title:"Requirements",type:"info",children:[(0,s.jsx)(n.p,{children:"Some extra dependencies are needed for this notebook, which can be installed via pip:"}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pip install pyautogen chess\n"})}),(0,s.jsxs)(n.p,{children:["For more information, please refer to the ",(0,s.jsx)(n.a,{href:"/docs/installation/",children:"installation guide"}),"."]})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"%%capture --no-stderr\nfrom collections import defaultdict\nfrom typing import Any, Dict, List, Optional, Union\n\nimport chess\nimport chess.svg\n\nimport autogen\n"})}),"\n",(0,s.jsx)(n.h2,{id:"set-your-api-endpoint",children:"Set your API Endpoint"}),"\n",(0,s.jsxs)(n.p,{children:["The\n",(0,s.jsx)(n.a,{href:"https://microsoft.github.io/autogen/docs/reference/oai/openai_utils#config_list_from_json",children:(0,s.jsx)(n.code,{children:"config_list_from_json"})}),"\nfunction loads a list of configurations from an environment variable or\na json file."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'config_list_gpt4 = autogen.config_list_from_json(\n    "OAI_CONFIG_LIST",\n    filter_dict={\n        "model": ["gpt-4", "gpt4", "gpt-4-32k", "gpt-4-32k-0314", "gpt-4-32k-v0314"],\n    },\n)\n'})}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.p,{children:["Learn more about configuring LLMs for agents ",(0,s.jsx)(n.a,{href:"/docs/topics/llm_configuration",children:"here"}),"."]})}),"\n",(0,s.jsx)(n.h2,{id:"define-agents",children:"Define Agents"}),"\n",(0,s.jsx)(n.p,{children:"We\u2019ll define a BoardAgent and a ChessPlayerAgent class."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'sys_msg = """You are an AI-powered chess board agent.\nYou translate the user\'s natural language input into legal UCI moves.\nYou should only reply with a UCI move string extracted from the user\'s input."""\n\n\nclass BoardAgent(autogen.AssistantAgent):\n    board: chess.Board\n    correct_move_messages: Dict[autogen.Agent, List[Dict]]\n\n    def __init__(self, board: chess.Board):\n        super().__init__(\n            name="BoardAgent",\n            system_message=sys_msg,\n            llm_config={"temperature": 0.0, "config_list": config_list_gpt4},\n            max_consecutive_auto_reply=10,\n        )\n        self.register_reply(autogen.ConversableAgent, BoardAgent._generate_board_reply)\n        self.board = board\n        self.correct_move_messages = defaultdict(list)\n\n    def _generate_board_reply(\n        self,\n        messages: Optional[List[Dict]] = None,\n        sender: Optional[autogen.Agent] = None,\n        config: Optional[Any] = None,\n    ) -> Union[str, Dict, None]:\n        message = messages[-1]\n        # extract a UCI move from player\'s message\n        reply = self.generate_reply(\n            self.correct_move_messages[sender] + [message], sender, exclude=[BoardAgent._generate_board_reply]\n        )\n        uci_move = reply if isinstance(reply, str) else str(reply["content"])\n        try:\n            self.board.push_uci(uci_move)\n        except ValueError as e:\n            # invalid move\n            return True, f"Error: {e}"\n        else:\n            # valid move\n            m = chess.Move.from_uci(uci_move)\n            display(  # noqa: F821\n                chess.svg.board(\n                    self.board, arrows=[(m.from_square, m.to_square)], fill={m.from_square: "gray"}, size=200\n                )\n            )\n            self.correct_move_messages[sender].extend([message, self._message_to_dict(uci_move)])\n            self.correct_move_messages[sender][-1]["role"] = "assistant"\n            return True, uci_move\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'sys_msg_tmpl = """Your name is {name} and you are a chess player.\nYou are playing against {opponent_name}.\nYou are playing as {color}.\nYou communicate your move using universal chess interface language.\nYou also chit-chat with your opponent when you communicate a move to light up the mood.\nYou should ensure both you and the opponent are making legal moves.\nDo not apologize for making illegal moves."""\n\n\nclass ChessPlayerAgent(autogen.AssistantAgent):\n    def __init__(\n        self,\n        color: str,\n        board_agent: BoardAgent,\n        max_turns: int,\n        **kwargs,\n    ):\n        if color not in ["white", "black"]:\n            raise ValueError(f"color must be either white or black, but got {color}")\n        opponent_color = "black" if color == "white" else "white"\n        name = f"Player {color}"\n        opponent_name = f"Player {opponent_color}"\n        sys_msg = sys_msg_tmpl.format(\n            name=name,\n            opponent_name=opponent_name,\n            color=color,\n        )\n        super().__init__(\n            name=name,\n            system_message=sys_msg,\n            max_consecutive_auto_reply=max_turns,\n            **kwargs,\n        )\n        self.register_reply(BoardAgent, ChessPlayerAgent._generate_reply_for_board, config=board_agent.board)\n        self.register_reply(ChessPlayerAgent, ChessPlayerAgent._generate_reply_for_player, config=board_agent)\n        self.update_max_consecutive_auto_reply(board_agent.max_consecutive_auto_reply(), board_agent)\n\n    def _generate_reply_for_board(\n        self,\n        messages: Optional[List[Dict]] = None,\n        sender: Optional[autogen.Agent] = None,\n        config: Optional[chess.Board] = None,\n    ) -> Union[str, Dict, None]:\n        board = config\n        # add a system message about the current state of the board.\n        board_state_msg = [{"role": "system", "content": f"Current board:\\n{board}"}]\n        last_message = messages[-1]\n        if last_message["content"].startswith("Error"):\n            # try again\n            last_message["role"] = "system"\n            return True, self.generate_reply(\n                messages + board_state_msg, sender, exclude=[ChessPlayerAgent._generate_reply_for_board]\n            )\n        else:\n            return True, None\n\n    def _generate_reply_for_player(\n        self,\n        messages: Optional[List[Dict]] = None,\n        sender: Optional[autogen.Agent] = None,\n        config: Optional[BoardAgent] = None,\n    ) -> Union[str, Dict, None]:\n        board_agent = config\n        # add a system message about the current state of the board.\n        board_state_msg = [{"role": "system", "content": f"Current board:\\n{board_agent.board}"}]\n        # propose a reply which will be sent to the board agent for verification.\n        message = self.generate_reply(\n            messages + board_state_msg, sender, exclude=[ChessPlayerAgent._generate_reply_for_player]\n        )\n        if message is None:\n            return True, None\n        # converse with the board until a legal move is made or max allowed retries.\n        # change silent to False to see that conversation.\n        self.initiate_chat(board_agent, clear_history=False, message=message, silent=self.human_input_mode == "NEVER")\n        # last message sent by the board agent\n        last_message = self._oai_messages[board_agent][-1]\n        if last_message["role"] == "assistant":\n            # didn\'t make a legal move after a limit times of retries.\n            print(f"{self.name}: I yield.")\n            return True, None\n        return True, self._oai_messages[board_agent][-2]\n'})}),"\n",(0,s.jsx)(n.h2,{id:"construct-agents",children:"Construct Agents"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'max_turn = 10\n\nboard = chess.Board()\nboard_agent = BoardAgent(board=board)\nplayer_black = ChessPlayerAgent(\n    color="black",\n    board_agent=board_agent,\n    max_turns=max_turn,\n    llm_config={"temperature": 0.5, "cache_seed": 1, "config_list": config_list_gpt4},\n)\nplayer_white = ChessPlayerAgent(\n    color="white",\n    board_agent=board_agent,\n    max_turns=max_turn,\n    llm_config={"temperature": 0.5, "cache_seed": 2, "config_list": config_list_gpt4},\n)\n'})}),"\n",(0,s.jsx)(n.h2,{id:"start-game",children:"Start Game"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'player_black.initiate_chat(player_white, message="Your turn.")\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-text",children:"Player black (to Player white):\n\nYour turn.\n\n--------------------------------------------------------------------------------\nPlayer white (to Player black):\n\nAlright, let's kick things off. I'll move my pawn from e2 to e4. The center of the board is the heart of the battle, isn't it? Your move. \n\ne2e4\n\n--------------------------------------------------------------------------------\nPlayer black (to Player white):\n\nAh, the King's Pawn Opening, a classic. Let's see how this plays out. I'll move my pawn from e7 to e5. \n\ne7e5\n\nYou know, I've always admired how chess reflects life. It's all about making strategic decisions, isn't it? Your move.\n\n--------------------------------------------------------------------------------\nPlayer white (to Player black):\n\nIndeed, chess is a mirror of life in many ways. Every move matters, just like every decision in life. I'll move my knight from g1 to f3, aiming to control the center.\n\ng1f3\n\n--------------------------------------------------------------------------------\nPlayer black (to Player white):\n\nWell said! Chess is indeed a game of deep strategy and foresight. I will move my knight from g8 to f6, matching your control of the center.\n\ng8f6\n\nDid you know, the knight's move is actually based on the 'L' shape, which stands for 'leap'? Quite interesting, isn't it? Your move.\n\n--------------------------------------------------------------------------------\nPlayer white (to Player black):\n\nThat's a fun fact! The knight's L-shaped leap makes it a unique piece on the board. Now, I'll move my bishop from f1 to c4, putting a little pressure on your side.\n\nf1c4\n\n--------------------------------------------------------------------------------\nPlayer black (to Player white):\n\nA strong move, indeed! I can see you're not one to hold back. I'll move my bishop from f8 to c5, maintaining the balance.\n\nf8c5\n\nYou know, the bishop was originally an elephant in ancient chess. It's fascinating how the game has evolved over the centuries, isn't it? Your move.\n\n--------------------------------------------------------------------------------\nPlayer white (to Player black):\n\nAbsolutely, the evolution of chess is quite fascinating. It's a testament to the game's timeless appeal. Now, I'll castle kingside to ensure my king's safety. \n\ne1g1\n\n--------------------------------------------------------------------------------\nPlayer black (to Player white):\n\nA wise decision, safety first! I'll follow your lead and castle kingside as well. \n\ne8g8\n\nThey say the king is a fighting piece, but in the early game, it's all about keeping him safe, isn't it? Your move.\n\n--------------------------------------------------------------------------------\nPlayer white (to Player black):\n\nI see, it looks like we had a bit of a mix-up. Let's get back to the game. I'll move my pawn from d2 to d4, opening up lines for my queen and bishop.\n\nd2d4\n\n--------------------------------------------------------------------------------\nPlayer black (to Player white):\n\nIndeed, opening lines for your major pieces is a crucial part of the game. I'll move my bishop from c5 to b6. \n\nc5b6\n\nChess is a lot like a dance, don't you think? Each piece moving in harmony with the others. Your move.\n\n--------------------------------------------------------------------------------\nPlayer white (to Player black):\n\nI see, it looks like we had a bit of a mix-up. Let's get back to the game. I'll move my queen from d1 to e2, aiming to control the center.\n\nd1e2\n\n--------------------------------------------------------------------------------\nPlayer black (to Player white):\n\nIndeed, control of the center is key. I'll move my queen from d8 to e7, matching your control of the center.\n\nd8e7\n\nDid you know the queen wasn't always the most powerful piece on the board? In the original game of chess, the piece could only move one square diagonally! Your move.\n\n--------------------------------------------------------------------------------\nPlayer white (to Player black):\n\nIndeed, the queen has come a long way from its humble beginnings. Now, I'll move my pawn from d4 to e5, adding some tension to the center.\n\nd4e5\n\n--------------------------------------------------------------------------------\nPlayer black (to Player white):\n\nInteresting move! This is shaping up to be quite the game. I'll move my knight from f6 to d5.\n\nf6d5\n\nYou know, the knight is the only piece that can jump over others. It's like the horse in a game of polo, leaping over obstacles. Your move.\n\n--------------------------------------------------------------------------------\nPlayer white (to Player black):\n\nIndeed, the knight's ability to jump over other pieces is quite unique. Now, I'll move my knight from b1 to c3, challenging your knight.\n\nb1c3\n\n--------------------------------------------------------------------------------\nPlayer black (to Player white):\n\nApologies for the confusion. It seems there was a misunderstanding. I'll correct that and move my knight from b8 to c6.\n\nb8c6\n\nDid you know that in the Middle Ages, the knight piece was usually carved to resemble a horse's head? Your move.\n\n--------------------------------------------------------------------------------\nPlayer white (to Player black):\n\nThat's a fascinating bit of history! The knight piece's design certainly adds to the charm of the game. Now, I'll move my bishop from c1 to g5, putting a little pressure on your queen.\n\nc1g5\n\n--------------------------------------------------------------------------------\nPlayer black (to Player white):\n\nWell played! I see you're not one to shy away from a challenge. I'll move my queen from e7 to e6, keeping her safe.\n\ne7e6\n\nDid you know that the queen's ability to move any number of squares along a rank, file, or diagonal is a relatively recent development in the history of chess? Your move.\n\n--------------------------------------------------------------------------------\nPlayer white (to Player black):\n\nIndeed, the queen's powers were significantly enhanced during the Middle Ages, transforming the game of chess. Now, I'll move my rook from a1 to d1, aligning it with your queen.\n\na1d1\n\n--------------------------------------------------------------------------------\nPlayer black (to Player white):\n\nMy apologies for the confusion. Let's correct that. I'll move my pawn from d7 to d6.\n\nd7d6\n\nDid you know that pawns are the soul of chess? It's fascinating how these seemingly insignificant pieces can control the fate of the game. Your move.\n\n--------------------------------------------------------------------------------\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(17211).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(87884).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(73499).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(6627).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(31420).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(50437).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(67582).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(52190).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(29950).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(11246).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(50619).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(98509).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(24471).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(82801).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(23765).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(10804).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(42372).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(66644).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(41795).Z+"",width:"200",height:"200"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:t(35163).Z+"",width:"200",height:"200"})})]})}function g(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},29950:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-10-6156e04f89d3ae4fdd3972ead329664e.svg"},11246:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-11-83ca245662660b3b50787e7656037dd1.svg"},50619:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-12-3cc070b2ecee5ccffe4a95be80a938eb.svg"},98509:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-13-0b8aaa58ab14bb1669740f71786faece.svg"},24471:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-14-0991abc365c7883d915f16194d55ec8e.svg"},82801:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-15-6d8469078116dfad4af00afa1ab776d3.svg"},23765:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-16-4ad4ba8c50654cd605d332fdad1b152c.svg"},10804:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-17-5c148a8a286403c284621de53e3719f9.svg"},42372:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-18-8fef5bb9975d8f5819c3933dc8076122.svg"},66644:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-19-2327b69e9893dcea790fed7b2864b831.svg"},17211:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-2-d2343a83089b541792b2b90253103fa1.svg"},41795:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-20-f289cc31cbba5827fba5c584f5001972.svg"},35163:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-21-8427431cd74b19f2455b8a14c830edd9.svg"},87884:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-3-e8505948501581757a0ed861d3bf34f0.svg"},73499:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-4-f629a365c0982ba70285540a97eade99.svg"},6627:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-5-d3c416b008ee3b02c9095f475e09ad1c.svg"},31420:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-6-e3bc6a1736bcce29c4b5514303fffe98.svg"},50437:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-7-c91d0ff4566b9a770961d69b272a61c0.svg"},67582:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-8-110fcd0f76181ee51bdb9931c2a6941f.svg"},52190:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/cell-7-output-9-cf0564dd84db83f7522f91fefee20409.svg"},11151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>i});var s=t(67294);const o={},a=s.createContext(o);function i(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);