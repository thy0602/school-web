var ChessBoard = function() {
  const wP = 1;
  const wN = 2; 
  const wB = 3; 
  const wR = 4;
  const wQ = 5; 
  const wK = 6;

  const bP = 7;
  const bN = 8;
  const bB = 9;
  const bR = 10;
  const bQ = 11;
  const bK = 12;

  const o = 13;  // off board
  const em = 0; // empty

  const white = 0;
  const black = 1;
  
  const a8 = 0, b8 = 1, c8 = 2, d8 = 3, e8 = 4, f8 = 5, g8 = 6, h8 = 7;
  const a7 = 16, h7 = 23;
  const a2 = 96, h2 = 103;
  const a1 = 112,  b1 = 113,  c1 = 114, d1 = 115, e1 = 116, f1 = 117, g1 = 118, h1 = 119;
  const nosq = 120;
  
  const coordinates_mp = [
    'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8', 'i8', 'j8', 'k8', 'l8', 'm8', 'n8', 'o8', 'p8',
    'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7', 'i7', 'j7', 'k7', 'l7', 'm7', 'n7', 'o7', 'p7',
    'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6', 'i6', 'j6', 'k6', 'l6', 'm6', 'n6', 'o6', 'p6',
    'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5', 'i5', 'j5', 'k5', 'l5', 'm5', 'n5', 'o5', 'p5',
    'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4', 'i4', 'j4', 'k4', 'l4', 'm4', 'n4', 'o4', 'p4',
    'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3', 'i3', 'j3', 'k3', 'l3', 'm3', 'n3', 'o3', 'p3',
    'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2', 'i2', 'j2', 'k2', 'l2', 'm2', 'n2', 'o2', 'p2',
    'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', 'i1', 'j1', 'k1', 'l1', 'm1', 'n1', 'o1', 'p1'
  ];

  var dKnight = [33, 31, 18, 14, -33, -31, -18, -14];
  var dBishop = [15, 17, -15, -17];
  var dRook = [16, -16, 1, -1];
  var dKing = [16, -16, 1, -1, 15, 17, -15, -17];

  var castling_rights = [
    7, 15, 15, 15,  3, 15, 15, 11,  o, o, o, o, o, o, o, o,
    15, 15, 15, 15, 15, 15, 15, 15,  o, o, o, o, o, o, o, o,
    15, 15, 15, 15, 15, 15, 15, 15,  o, o, o, o, o, o, o, o,
    15, 15, 15, 15, 15, 15, 15, 15,  o, o, o, o, o, o, o, o,
    15, 15, 15, 15, 15, 15, 15, 15,  o, o, o, o, o, o, o, o,
    15, 15, 15, 15, 15, 15, 15, 15,  o, o, o, o, o, o, o, o,
    15, 15, 15, 15, 15, 15, 15, 15,  o, o, o, o, o, o, o, o,
    13, 15, 15, 15, 12, 15, 15, 14,  o, o, o, o, o, o, o, o
  ];

  var promoted_pieces = {
    [wQ]: 'q',
    [wR]: 'r',
    [wB]: 'b',
    [wN]: 'n',
    [bQ]: 'q',
    [bR]: 'r',
    [bB]: 'b',
    [bN]: 'n'
  };

  const KC = 1, QC = 2, kc = 4, qc = 8;

  var board = [
    bR, bN, bB, bQ, bK, bB, bN, bR,  0,  0,  0,  0,  0,  0,  0,  0,
    bP, bP, bP, bP, bP, bP, bP, bP,  0,  0,  0,  0,  0,  0,  0,  0,
    em, em, em, em, em, em, em, em,  0,  0,  0,  0,  0,  0,  0,  0,
    em, em, em, em, em, em, em, em,  0,  0,  0,  0,  0,  0,  0,  0, 
    em, em, em, em, em, em, em, em,  0,  0,  0,  0,  0,  0,  0,  0,
    em, em, em, em, em, em, em, em,  0,  0,  0,  0,  0,  0,  0,  0,
    wP, wP, wP, wP, wP, wP, wP, wP,  0,  0,  0,  0,  0,  0,  0,  0,
    wR, wN, wB, wQ, wK, wB, wN, wR,  0,  0,  0,  0,  0,  0,  0,  0
];
  
  var side = white;
  var enpassant = nosq;
  var castle = 15;
  var fifty = 0;
  var king_square = [e1, e8];
  
  function reset_board() {
    board = [
      bR, bN, bB, bQ, bK, bB, bN, bR,  0,  0,  0,  0,  0,  0,  0,  0,
      bP, bP, bP, bP, bP, bP, bP, bP,  0,  0,  0,  0,  0,  0,  0,  0,
      em, em, em, em, em, em, em, em,  0,  0,  0,  0,  0,  0,  0,  0,
      em, em, em, em, em, em, em, em,  0,  0,  0,  0,  0,  0,  0,  0, 
      em, em, em, em, em, em, em, em,  0,  0,  0,  0,  0,  0,  0,  0,
      em, em, em, em, em, em, em, em,  0,  0,  0,  0,  0,  0,  0,  0,
      wP, wP, wP, wP, wP, wP, wP, wP,  0,  0,  0,  0,  0,  0,  0,  0,
      wR, wN, wB, wQ, wK, wB, wN, wR,  0,  0,  0,  0,  0,  0,  0,  0
    ];
  
    side = 0;
    enpassant = nosq;
    castle = 0;
    fifty = 0;
    king_square = [0, 0];
    
    document.getElementById("turn-noti").innerHTML = "WHITE TURN";

    update();
  }

  function encode_move_to_bitmask(src, des, piece, capture, pawn, enpassant, castle) {
    return (src) | (des << 7) | (piece << 14) | (capture << 18) | (pawn << 19) | (enpassant << 20) | (castle << 21)
  }

  function get_move_src(move) {
    return move & 127;
  }

  function get_move_des(move) { 
    return (move >> 7) & 127;
  }

  function get_move_piece(move) { 
    return (move >> 14) & 15;
  }

  function get_move_capture(move) { 
    return (move >> 18) & 1;
  }

  function get_move_pawn(move) { 
    return (move >> 19) & 1;
  }

  function get_move_enpassant(move) { 
    return (move >> 20) & 1;
  }

  function get_move_castling(move) { 
    return (move >> 21) & 1;
  }

  function check_side_with_piece(dest_piece, w, b) {
    return (!side ? dest_piece == w : dest_piece == b)
  }

  function is_valid_attacked(square, side) {
    if (!side) {
      if (!((square + 17) & 136) && (board[square + 17] == wP))
        return 1;
      if (!((square + 15) & 136) && (board[square + 15] == wP))
        return 1;
    }
    else {
      if (!((square - 17) & 136) && (board[square - 17] == bP))
        return 1;
      if (!((square - 15) & 136) && (board[square - 15] == bP))
        return 1;
    }
    
    for (var i = 0; i < 8; i++) {
      var target_square = square + dKnight[i];
      var dest_piece = board[target_square];
      
      if (!(target_square & 136)) {
        if (check_side_with_piece(dest_piece, wN, bN))
          return 1;
      } 
    }
    
    for (var i = 0; i < 8; i++) {
      var target_square = square + dKing[i];
      var dest_piece = board[target_square];

      if (!(target_square & 136)) {
        if (check_side_with_piece(dest_piece, wK, bK))
          return 1;
      } 
    }
    
    for (var i = 0; i < 4; i++) {
      var target_square = square + dBishop[i];
      while (!(target_square & 136)) {
        var dest_piece = board[target_square];
      
        if (!side ? (dest_piece == wB || dest_piece == wQ) : (dest_piece == bB || dest_piece == bQ))
          return 1;
        if (dest_piece)
          break;
        target_square += dBishop[i];
      }
    }
    
    for (var i = 0; i < 4; i++) {
      var target_square = square + dRook[i];
      
      while (!(target_square & 136)) {
        var dest_piece = board[target_square];
        
        if (!side ? (dest_piece == wR || dest_piece == wQ) : (dest_piece == bR || dest_piece == bQ))
          return 1;
        if (dest_piece)
          break;

        target_square += dRook[i];
      }
    }
    return 0;
  }

  function insert_move(move_lst, move) {
    move_lst.moves[move_lst.count] = move;
    move_lst.count++;
  }

  function get_all_valid_moves(move_lst) {
    for (var square = 0; square < 128; square++) {
      if (!(square & 136)) {
        if (!side) {
          if (board[square] == wP) {
            var dest_square = square - 16;
            if (!(dest_square & 136) && !board[dest_square]) {   
              if (square >= a7 && square <= h7) {
                insert_move(move_lst, encode_move_to_bitmask(square, dest_square, wQ, 0, 0, 0, 0));
                insert_move(move_lst, encode_move_to_bitmask(square, dest_square, wR, 0, 0, 0, 0));
                insert_move(move_lst, encode_move_to_bitmask(square, dest_square, wB, 0, 0, 0, 0));
                insert_move(move_lst, encode_move_to_bitmask(square, dest_square, wN, 0, 0, 0, 0));                            
              }
              else {
                insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 0, 0, 0, 0));

                if ((square >= a2 && square <= h2) && !board[square - 32])
                  insert_move(move_lst, encode_move_to_bitmask(square, square - 32, 0, 0, 1, 0, 0));
              }
            }
                  
            for (var i = 0; i < 4; i++) {
              var dPawn = dBishop[i];
              
              if (dPawn < 0) {
                var dest_square = square + dPawn;
                
                if (!(dest_square & 136)) {
                  if ((square >= a7 && square <= h7) && (board[dest_square] >= 7 && board[dest_square] <= 12)) {
                    insert_move(move_lst, encode_move_to_bitmask(square, dest_square, wQ, 1, 0, 0, 0));
                    insert_move(move_lst, encode_move_to_bitmask(square, dest_square, wR, 1, 0, 0, 0));
                    insert_move(move_lst, encode_move_to_bitmask(square, dest_square, wB, 1, 0, 0, 0));
                    insert_move(move_lst, encode_move_to_bitmask(square, dest_square, wN, 1, 0, 0, 0));
                  }
                  else {
                    if (board[dest_square] >= 7 && board[dest_square] <= 12)
                      insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 1, 0, 0, 0));
                    
                    if (dest_square == enpassant)
                      insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 1, 0, 1, 0));
                  }
                }
              }
            }
          }
                
          if (board[square] == wK) {
            if (castle & KC) {
              if (!board[f1] && !board[g1]) {
                if (!is_valid_attacked(e1, black) && !is_valid_attacked(f1, black))
                  insert_move(move_lst, encode_move_to_bitmask(e1, g1, 0, 0, 0, 0, 1));
              }
            }
              
            if (castle & QC) {
              if (!board[d1] && !board[b1] && !board[c1]) {
                if (!is_valid_attacked(e1, black) && !is_valid_attacked(d1, black))
                  insert_move(move_lst, encode_move_to_bitmask(e1, c1, 0, 0, 0, 0, 1));
              }
            }
          }
        }
        else
        {
          if (board[square] == bP) {
            var dest_square = square + 16;
            
            if (!(dest_square & 136) && !board[dest_square]) {   
              if (square >= a2 && square <= h2) {
                insert_move(move_lst, encode_move_to_bitmask(square, dest_square, bQ, 0, 0, 0, 0));
                insert_move(move_lst, encode_move_to_bitmask(square, dest_square, bR, 0, 0, 0, 0));
                insert_move(move_lst, encode_move_to_bitmask(square, dest_square, bB, 0, 0, 0, 0));
                insert_move(move_lst, encode_move_to_bitmask(square, dest_square, bN, 0, 0, 0, 0));
              }
              else {
                insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 0, 0, 0, 0));
                
                if ((square >= a7 && square <= h7) && !board[square + 32])
                  insert_move(move_lst, encode_move_to_bitmask(square, square + 32, 0, 0, 1, 0, 0));
              }
            }
              
            for (var i = 0; i < 4; i++) {
              var dPawn = dBishop[i];
              
              if (dPawn > 0) {
                var dest_square = square + dPawn;
                
                if (!(dest_square & 136)) {
                  if ((square >= a2 && square <= h2) && (board[dest_square] >= 1 && board[dest_square] <= 6)) {
                    insert_move(move_lst, encode_move_to_bitmask(square, dest_square, bQ, 1, 0, 0, 0));
                    insert_move(move_lst, encode_move_to_bitmask(square, dest_square, bR, 1, 0, 0, 0));
                    insert_move(move_lst, encode_move_to_bitmask(square, dest_square, bB, 1, 0, 0, 0));
                    insert_move(move_lst, encode_move_to_bitmask(square, dest_square, bN, 1, 0, 0, 0));
                  }
                  else {
                    if (board[dest_square] >= 1 && board[dest_square] <= 6)
                      insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 1, 0, 0, 0));
                    if (dest_square == enpassant)
                      insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 1, 0, 1, 0));
                  }
                }
              }
            }
          }
          
          if (board[square] == bK) {
            if (castle & kc) {
              if (!board[f8] && !board[g8]) {
                if (!is_valid_attacked(e8, white) && !is_valid_attacked(f8, white))
                  insert_move(move_lst, encode_move_to_bitmask(e8, g8, 0, 0, 0, 0, 1));
              }
            }
            if (castle & qc) {
              if (!board[d8] && !board[b8] && !board[c8]) {
                if (!is_valid_attacked(e8, white) && !is_valid_attacked(d8, white))
                  insert_move(move_lst, encode_move_to_bitmask(e8, c8, 0, 0, 0, 0, 1));
              }
            }
          }
        }
            
        if (!side ? board[square] == wN : board[square] == bN) {
          for (var i = 0; i < 8; i++) {
            var dest_square = square + dKnight[i];

            var piece = board[dest_square];

            if (!(dest_square & 136)) {
              if (!side ? (!piece || (piece >= 7 && piece <= 12)) : (!piece || (piece >= 1 && piece <= 6))) {
                if (piece)
                  insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 1, 0, 0, 0));
                else
                  insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 0, 0, 0, 0));
              }
            }
          }
        }
            
        if (!side ? board[square] == wK : board[square] == bK) {
          for (var i = 0; i < 8; i++) {
            var dest_square = square + dKing[i];  
            var piece = board[dest_square];

            if (!(dest_square & 136)) {
              if (!side ? (!piece || (piece >= 7 && piece <= 12)) : (!piece || (piece >= 1 && piece <= 6))) {
                  // on capture
                  if (piece)
                    insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 1, 0, 0, 0));
                      
                  // on empty square
                  else
                    insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 0, 0, 0, 0));
              }
            }
          }
        }

        if (!side ? (board[square] == wB) || (board[square] == wQ) : (board[square] == bB) || (board[square] == bQ)) {
          for (var i = 0; i < 4; i++) {
            var dest_square = square + dBishop[i];

            while (!(dest_square & 136)) {
              var piece = board[dest_square];

              if (!side ? (piece >= 1 && piece <= 6) : ((piece >= 7 && piece <= 12)))
                break;
              if (!side ? (piece >= 7 && piece <= 12) : ((piece >= 1 && piece <= 6))) {
                insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 1, 0, 0, 0));
                break;
              }

              if (!piece)
                insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 0, 0, 0, 0));
              dest_square += dBishop[i];
            }
          }
        }
            
        if (!side ? (board[square] == wR) || (board[square] == wQ) : (board[square] == bR) || (board[square] == bQ)) {
          for (var i = 0; i < 4; i++) {
            var dest_square = square + dRook[i];

            while (!(dest_square & 136)) {
              var piece = board[dest_square];

              if (!side ? (piece >= 1 && piece <= 6) : ((piece >= 7 && piece <= 12)))
                break;
              if (!side ? (piece >= 7 && piece <= 12) : ((piece >= 1 && piece <= 6))) {
                  insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 1, 0, 0, 0));
                break;
              }
              if (!piece)
                insert_move(move_lst, encode_move_to_bitmask(square, dest_square, 0, 0, 0, 0, 0));
              dest_square += dRook[i];
            }
          }
        }
      }
    }
  }

  const almvs = 0;

  function make_move(move, capture_flag) {
    if (capture_flag == almvs) {
      var board_copy, king_square_copy, side_copy, enpassant_copy, castle_copy, fifty_copy;
      board_copy = JSON.parse(JSON.stringify(board));
      side_copy = side;
      enpassant_copy = enpassant;
      castle_copy = castle;
      fifty_copy = fifty;
      king_square_copy = JSON.parse(JSON.stringify(king_square));
      
      var from_square = get_move_src(move);
      var dest_square = get_move_des(move);
      var promoted_piece = get_move_piece(move);
      var enpass = get_move_enpassant(move);
      var double_push = get_move_pawn(move);
      var castling = get_move_castling(move);
      
      board[dest_square] = board[from_square];
      board[from_square] = em;
      fifty++;
      
      if (board[from_square] == wP || board[from_square] == bP)
        fifty = 0;

      if (get_move_capture(move)) {
        fifty = 0;
      }

      if (promoted_piece) {
        board[dest_square] = promoted_piece;
      }
      
      if (enpass) {
        if (side == white) {
          board[dest_square + 16] = em;
        }
        else {
          board[dest_square - 16] = em;
        }
      }

      enpassant = nosq;
      if (double_push) {
        if (side == white) {
          enpassant = dest_square + 16;
        }
        else {
          enpassant = dest_square - 16;
        }
      }

      if (castling) {
        if (dest_square == g1) {
          board[f1] = board[h1];
          board[h1] = em;
        }
        else if (dest_square == c1) {
          board[d1] = board[a1];
          board[a1] = em;
        }
        else if (dest_square == g8) {
          board[f8] = board[h8];
          board[h8] = em;
        }
        else if (dest_square == c8) {
          board[d8] = board[a8];
          board[a8] = em;
        }
      }
      
      if (board[dest_square] == wK || board[dest_square] == bK)
        king_square[side] = dest_square;

      castle &= castling_rights[from_square];
      castle &= castling_rights[dest_square];
        
      side = 1 - side;

      if (is_valid_attacked(!side ? king_square[1 - side] : king_square[1 - side], side)) {
        board = JSON.parse(JSON.stringify(board_copy));
        side = side_copy;
        enpassant = enpassant_copy;
        castle = castle_copy;
        fifty = fifty_copy;
        king_square = JSON.parse(JSON.stringify(king_square_copy));
        return 0;
      }
      else
        return 1;
    }
    else {
      if (get_move_capture(move))
        make_move(move, almvs);
      else       
        return 0;
    }
    
    return 1;
  }

  function is_valid(move_str) {
    var move_lst = {
      moves: new Array(),
      count: 0
    }

    get_all_valid_moves(move_lst);

    var parse_from = (move_str[0].charCodeAt() - 'a'.charCodeAt()) + (8 - (move_str[1].charCodeAt() - '0'.charCodeAt())) * 16;
    var parse_to = (move_str[2].charCodeAt() - 'a'.charCodeAt()) + (8 - (move_str[3].charCodeAt() - '0'.charCodeAt())) * 16;
    var prom = 0;
    var move;

    for(var i = 0; i < move_lst.count; i++) {
      move = move_lst.moves[i];

      if(get_move_src(move) == parse_from && get_move_des(move) == parse_to) {
        prom = get_move_piece(move);

        if(prom) {
          if((prom == wN || prom == bN) && move_str[4] == 'n')
            return move;
          else if ((prom == wB || prom == bB) && move_str[4] == 'b')
            return move;
          else if ((prom == wR || prom == bR) && move_str[4] == 'r')
            return move;
          else if ((prom == wQ || prom == bQ) && move_str[4] == 'q')
            return move;
          continue;
        }
        return move;
      }
    }
    return 0;
  }

  var lock = 0;
  var user_src, user_des;

  function update() {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 16; j++) {
        var square = i * 16 + j;

        if ((square & 136) == 0)
          document.getElementById(square).innerHTML = '<img style="width:50px" draggable="true" id="' + 
                                                       board[square] + '" src ="images/' + 
                                                      (board[square]) +'.png">';
      }
    }
  }
  
  function pick_piece(event, square) {
    user_src = square;
  }
  
  function drag_over(event, square) {        
    event.preventDefault();
    if (square == user_src)
      event.target.src = 'images/0.png';
  }
  
  function drop_piece(event, square) {
    user_des = square;
    move_piece(square);
    event.preventDefault();
  }
  
  function tap_piece(square) {
    update();
  
    var click_square = parseInt(square, 10)
     
    if(!lock && board[click_square]) {      
      user_src = click_square;
      lock = 1 - lock;
    }
    else if (lock) {      
      user_des = click_square;

      move_piece(square);
    }
  }
  
  function move_piece(square) {
    var promoted_piece = wQ;

    let move_str = coordinates_mp[user_src] + 
                   coordinates_mp[user_des] + 
                   promoted_pieces[promoted_piece];
    
    var valid_move  = is_valid(move_str);

    if (valid_move) {
      make_move(valid_move, almvs);

      var turn = "WHITE TURN";
      if (side)
        turn = "BLACK TURN";

      document.getElementById("turn-noti").innerHTML = turn;

      update();
    }

    update();
    lock = 0;
  } 
  
  return {    
    start_move: function(square) { tap_piece(square); },
    pick_piece: function(event, square) { pick_piece(event, square); },
    drag_over: function(event, square) { drag_over(event, square); },
    drop_piece: function(event, square) { drop_piece(event, square); },
    reset_board: function() { reset_board() },
  }
}
