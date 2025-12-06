// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Decentralized Guestbook
 * @dev Stores messages on the blockchain permanently.
 */
contract Guestbook {
    
    // 방명록 글 구조 정의 (누가, 언제, 무슨 말을)
    struct Message {
        address sender;
        string content;
        uint256 timestamp;
    }

    // 모든 메시지를 저장하는 리스트
    Message[] public messages;

    // 새 글이 올라오면 블록체인 밖(프론트엔드)에 알리는 신호
    event NewMessage(address indexed from, uint256 timestamp, string message);

    // 1. 글쓰기 함수 (트랜잭션 발생, 가스비 듦)
    function write(string memory _content) public {
        // 내용이 비어있으면 거절
        require(bytes(_content).length > 0, "Message cannot be empty");
        
        // 블록체인에 저장
        messages.push(Message(msg.sender, _content, block.timestamp));
        
        // 이벤트 발생 (새 글이 올라왔다고 알림)
        emit NewMessage(msg.sender, block.timestamp, _content);
    }

    // 2. 글 목록 조회 함수 (읽기 전용, 가스비 무료)
    function getMessages() public view returns (Message[] memory) {
        return messages;
    }

    // 3. 전체 글 개수 조회
    function getTotalMessages() public view returns (uint256) {
        return messages.length;
    }
}